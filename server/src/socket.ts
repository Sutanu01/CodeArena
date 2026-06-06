import { Server, Socket } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { verifyToken } from "@clerk/express";
import { z } from "zod";
import crypto from "crypto";
import {
  CANT_JOIN_ROOM,
  CANT_MATCHMAKE,
  CREATE_ROOM,
  DRAW_MATCH,
  END_MATCHMAKING,
  JOIN_ROOM,
  LEFT_MATCH,
  LEFT_ROOM,
  LOSE_MATCH,
  MATCH_OVER,
  OPPONENT_LEFT,
  OPPONENT_READY,
  START_CONTEST,
  START_MATCHMAKING,
  STARTED_MATCH,
  WIN_MATCH,
} from "./constants/socketEvents.js";
import UserModel, { type User } from "./models/User.js";
import { MatchMaker } from "./utils/matchmaking.js";
import { createRoom, joinRoom, removeSocketFromRoom } from "./utils/room.js";
import { getUnsolvedQuestionLink, updateMatches } from "./utils/utility.js";
import { createRedisClient } from "./config/redis.js";
import { applySocketRateLimiter } from "./middlewares/rateLimiter.js";
import {
  setUserSocket,
  getUserSocket,
  deleteUserSocket,
  addActiveUser,
  hasActiveUser,
  removeActiveUser,
  setOpponent,
  getOpponent,
  hasOpponent,
  deleteOpponent,
} from "./utils/redisState.js";

let isMatching = false; // Flag to prevent overlapping matchmaking runs
const matchMaker = new MatchMaker();

const StartMatchmakingSchema = z.object({
  mode: z.enum(["10", "25", "40"]),
});

const OpponentReadySchema = z.object({
  to: z.string().optional(),
});

const OpponentLeftSchema = z.object({
  to: z.string().optional(),
  mode: z.enum(["10", "25", "40"]),
});

const CreateRoomSchema = z.object({
  lowerRating: z.number().min(0).max(3500),
  upperRating: z.number().min(0).max(3500),
  tags: z.array(z.string()).default([]),
});

const JoinRoomSchema = z.object({
  roomId: z.string().min(1),
});

const StartedMatchSchema = z.object({
  opponentSocketId: z.string().min(1),
});

const MatchOverSchema = z.object({
  acceptedUserId: z.string().nullable(),
  youId: z.string().min(1),
  opponentId: z.string().min(1),
  opponentSocketId: z.string().min(1),
});


async function setupRedisAdapter(io: Server): Promise<void> {
  try {
    const pubClient = createRedisClient();
    const subClient = createRedisClient();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    io.adapter(createAdapter(pubClient, subClient));
    console.log("[Socket.IO] Redis Adapter connected (pub/sub).");
  } catch (err) {
    console.error("[Socket.IO] Failed to setup Redis Adapter:", err);
    console.warn("[Socket.IO] Falling back to default in-memory adapter.");
  }
}


export const socketSetup = async (io: Server) => {

  await setupRedisAdapter(io);

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) {
        return next(new Error("Authentication required"));
      }
      const verified = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
        clockSkewInMs: 30000,
      });
      const user = await UserModel.findOne({ clerkId: verified.sub });
      if (!user) {
        return next(new Error("User not found"));
      }
      socket.data.user = user;
      next();
    } catch (err) {
      console.error("Socket authentication error:", err);
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", async (socket: Socket) => {
    console.log("A user connected with ID:", socket.id);

    if (socket.data.user) {
      await setUserSocket(socket.id, socket.data.user);
    }

    applySocketRateLimiter(socket, [
      {
        eventName: START_MATCHMAKING,
        keyPrefix: "codearena:ratelimit:socket:matchmaking",
        limit: 5,
        windowMs: 60_000,
      },
      {
        eventName: CREATE_ROOM,
        keyPrefix: "codearena:ratelimit:socket:create_room",
        limit: 5,
        windowMs: 60_000,
      },
      {
        eventName: JOIN_ROOM,
        keyPrefix: "codearena:ratelimit:socket:join_room",
        limit: 10,
        windowMs: 60_000,
      },
    ]);

    const handleLeaveMatch = async () => {
      const user = await getUserSocket(socket.id);
      if (!user) return;

      const opponentSocketId = await getOpponent(socket.id);
      if (opponentSocketId) {
        const opponentUser = await getUserSocket(opponentSocketId);
        if (opponentUser) {
          // Update matches for loss and win
          await Promise.all([
            updateMatches({
              userId: user._id as string,
              opponent_name: opponentUser.username,
              result: "Loss",
            }),
            updateMatches({
              userId: opponentUser._id as string,
              opponent_name: user.username,
              result: "Win",
            }),
          ]);
        }
        io.to(opponentSocketId).emit(WIN_MATCH, {
          message: "Your opponent has left the match.",
        });
        await removeActiveUser(opponentUser?._id as string);
        matchMaker.removePlayer(opponentSocketId);
        await deleteOpponent(opponentSocketId);
      }
      await removeActiveUser(user._id as string);
      matchMaker.removePlayer(socket.id);
      await deleteOpponent(socket.id);
    };

    socket.on(START_MATCHMAKING, async (info: any) => {
      const parsed = StartMatchmakingSchema.safeParse(info);
      if (!parsed.success) return;
      const { mode } = parsed.data;

      const user = await getUserSocket(socket.id);
      if (!user) return;

      if (await hasActiveUser(user._id as string)) {
        io.to(socket.id).emit(CANT_MATCHMAKE, {
          error: "You are already in a matchmaking queue or Match",
        });
        return;
      }

      await addActiveUser(user._id as string);

      if (user.codeforces_info.rating !== undefined) {
        matchMaker.addPlayer({
          id: socket.id,
          rating: user.codeforces_info.rating || 0,
          joinTime: Date.now(),
          queueType: mode,
        });
      }
    });

    
    socket.on(END_MATCHMAKING, async () => {
      const user = await getUserSocket(socket.id);
      if (!user) return;
      await removeActiveUser(user._id as string);
      matchMaker.removePlayer(socket.id);
    });

    
    socket.on(OPPONENT_READY, async () => {
      const opponentSocketId = await getOpponent(socket.id);
      if (opponentSocketId) {
        io.to(opponentSocketId).emit(OPPONENT_READY);
      }
    });

    
    socket.on(OPPONENT_LEFT, async (data: any) => {
      const parsed = OpponentLeftSchema.safeParse(data);
      if (!parsed.success) return;
      const { mode } = parsed.data;
      const opponentSocketId = await getOpponent(socket.id);
      if (!opponentSocketId) return;

      io.to(opponentSocketId).emit(OPPONENT_LEFT);
      const user = await getUserSocket(socket.id);
      if (!user) return;
      await removeActiveUser(user._id as string);

      const remainingUser = await getUserSocket(opponentSocketId);
      if (remainingUser?.codeforces_info.rating !== undefined) {
        matchMaker.addPlayer({
          id: opponentSocketId,
          rating: remainingUser.codeforces_info.rating || 0,
          joinTime: Date.now(),
          queueType: mode,
        });
      }
      await deleteOpponent(socket.id);
      await deleteOpponent(opponentSocketId);
    });

    
    socket.on(CREATE_ROOM, async (data: any) => {
      const parsed = CreateRoomSchema.safeParse(data);
      if (!parsed.success) return;
      const { lowerRating, upperRating, tags } = parsed.data;

      const user = await getUserSocket(socket.id);
      if (!user) return;

      if (await hasActiveUser(user._id as string)) {
        io.to(socket.id).emit(CANT_MATCHMAKE, {
          error: "You are already in a matchmaking queue or Match",
        });
        return;
      }

      await addActiveUser(user._id as string);

      const roomId = await createRoom({
        player1_socketId: socket.id,
        lowerRating,
        upperRating,
        tags,
      });

      io.to(socket.id).emit(CREATE_ROOM, { roomId });
    });

    
    socket.on(JOIN_ROOM, async (data: any) => {
      const parsed = JoinRoomSchema.safeParse(data);
      if (!parsed.success) return;
      const { roomId } = parsed.data;

      const user = await getUserSocket(socket.id);
      if (!user) {
        io.to(socket.id).emit(CANT_JOIN_ROOM, "User not found");
        return;
      }

      if (await hasActiveUser(user._id as string)) {
        io.to(socket.id).emit(CANT_JOIN_ROOM, "You are already in a match");
        return;
      }

      try {
        const room = await joinRoom({
          player2_socketId: socket.id,
          roomId,
        });

        if (!room.ok) {
          io.to(socket.id).emit(CANT_JOIN_ROOM, room.error);
          return;
        }

        
        const { player1, player2, lowerRating, upperRating, tags, question } = room;

        await addActiveUser(user._id as string);
        await setOpponent(player1, player2);
        await setOpponent(player2, player1);

        const user1 = await getUserSocket(player1);
        const user2 = await getUserSocket(player2);

        if (!user1 || !user2) {
          await removeActiveUser(user._id as string);
          io.to(socket.id).emit(CANT_JOIN_ROOM, "Player data not found");
          return;
        }

        const contestData1 = {
          roomId,
          lowerRating,
          upperRating,
          tags,
          you: user1,
          opponent: user2,
          opponentSocketId: player2,
          question,
        };

        const contestData2 = {
          roomId,
          lowerRating,
          upperRating,
          tags,
          you: user2,
          opponent: user1,
          opponentSocketId: player1,
          question,
        };

        io.to(player1).emit(START_CONTEST, contestData1);
        io.to(player2).emit(START_CONTEST, contestData2);
      } catch (error) {
        console.error(`JOIN_ROOM: Error processing room ${roomId}:`, error);
        io.to(socket.id).emit(CANT_JOIN_ROOM, "Failed to join room");
      }
    });

    
    socket.on(LEFT_ROOM, async () => {
      const user = await getUserSocket(socket.id);
      if (!user) return;
      await removeActiveUser(user._id as string);
      await removeSocketFromRoom(socket, io);
    });

    
    socket.on(STARTED_MATCH, async (data: any) => {
      const parsed = StartedMatchSchema.safeParse(data);
      if (!parsed.success) return;
      const { opponentSocketId } = parsed.data;
      await setOpponent(socket.id, opponentSocketId);
    });

    
    socket.on(MATCH_OVER, async (data: any) => {
      const parsed = MatchOverSchema.safeParse(data);
      if (!parsed.success) return;
      const { acceptedUserId, youId, opponentId, opponentSocketId } = parsed.data;

      const user = await getUserSocket(socket.id);
      const opponentUser = await getUserSocket(opponentSocketId);
      if (!user || user._id != youId || !opponentUser || !opponentUser._id)
        return;

      await removeActiveUser(user._id as string);
      await removeActiveUser(opponentUser._id as string);
      matchMaker.removePlayer(opponentSocketId);
      matchMaker.removePlayer(socket.id);

      if (acceptedUserId) {
        if (acceptedUserId === opponentId) {
          await Promise.all([
            updateMatches({
              userId: youId,
              opponent_name: opponentUser.username,
              result: "Loss",
            }),
            updateMatches({
              userId: opponentId,
              opponent_name: user.username,
              result: "Win",
            }),
          ]);
          io.to(opponentSocketId).emit(WIN_MATCH);
          io.to(socket.id).emit(LOSE_MATCH);
        } else {
          await Promise.all([
            updateMatches({
              userId: youId,
              opponent_name: opponentUser.username,
              result: "Win",
            }),
            updateMatches({
              userId: opponentId,
              opponent_name: user.username,
              result: "Loss",
            }),
          ]);
          io.to(opponentSocketId).emit(LOSE_MATCH);
          io.to(socket.id).emit(WIN_MATCH);
        }
      } else {
        //DRAW
        await Promise.all([
          updateMatches({
            userId: youId,
            opponent_name: opponentUser.username,
            result: "Draw",
          }),
          updateMatches({
            userId: opponentId,
            opponent_name: user.username,
            result: "Draw",
          }),
        ]);
        io.to(opponentSocketId).emit(DRAW_MATCH);
        io.to(socket.id).emit(DRAW_MATCH);
      }
      await deleteOpponent(socket.id);
      await deleteOpponent(opponentSocketId);
    });

    
    socket.on(LEFT_MATCH, async () => {
      await removeSocketFromRoom(socket, io);
      await handleLeaveMatch();
    });

    
    socket.on("disconnect", async () => {
      console.log("A user disconnected with ID:", socket.id);
      const user = await getUserSocket(socket.id);
      if (!user) return;
      await removeSocketFromRoom(socket, io);
      await handleLeaveMatch();
      await deleteUserSocket(socket.id);
    });
  });


  // Matchmaking Interval (still in-memory)
  setInterval(async () => {
    if (isMatching) return;
    isMatching = true;

    try {
      const matches = matchMaker.matchPlayers();
      for (const { queueType, players: [player1, player2] } of matches) {
        const user1 = await getUserSocket(player1.id);
        const user2 = await getUserSocket(player2.id);
        let lowerRating = 0;
        let upperRating = 0;
        if (queueType === "10") {
          lowerRating = 0;
          upperRating = 1300;
        } else if (queueType === "25") {
          lowerRating = 1400;
          upperRating = 1700;
        } else if (queueType === "40") {
          lowerRating = 1800;
          upperRating = 3500;
        }
        if (user1 && user2) {
          try {
            console.log(`Auto-matching ${user1.username} vs ${user2.username}`);
            const question = await getUnsolvedQuestionLink({
              userId1: user1._id as string,
              userId2: user2._id as string,
              lowerRating,
              upperRating,
            });

            // Secure random room ID generation
            const roomId = crypto.randomBytes(6).toString("hex").toUpperCase();

            await setOpponent(player1.id, player2.id);
            await setOpponent(player2.id, player1.id);

            const contestData1 = {
              roomId,
              you: user1,
              opponent: user2,
              opponentSocketId: player2.id,
              question,
            };

            const contestData2 = {
              roomId,
              you: user2,
              opponent: user1,
              opponentSocketId: player1.id,
              question,
            };

            io.to(player1.id).emit(START_CONTEST, contestData1);
            io.to(player2.id).emit(START_CONTEST, contestData2);

            console.log(
              `Match created: ${user1.username} vs ${user2.username} in room ${roomId}`
            );
          } catch (questionError) {
            console.error("Error getting question for match:", questionError);
            if (user1) {
              await removeActiveUser(user1._id as string);
              matchMaker.addPlayer(player1);
            }
            if (user2) {
              await removeActiveUser(user2._id as string);
              matchMaker.addPlayer(player2);
            }
          }
        } else {
          if (!user1) matchMaker.removePlayer(player1.id);
          if (!user2) matchMaker.removePlayer(player2.id);
        }
      }
    } catch (error) {
      console.error("Error during matchmaking:", error);
    } finally {
      isMatching = false;
    }
  }, 1000);
};
