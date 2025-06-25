import { Server, Socket } from "socket.io";
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
  SETUSER,
  START_CONTEST,
  START_MATCHMAKING,
  STARTED_MATCH,
  WIN_MATCH,
} from "./constants/socketEvents.js";
import { User } from "./models/User.js";
import { MatchMaker } from "./utils/matchmaking.js";
import { createRoom, joinRoom, removeSocketFromRoom } from "./utils/room.js";
import { getUnsolvedQuestionLink, updateMatches } from "./utils/utility.js";

let isMatching = false; // Flag to prevent overlapping matchmaking runs
const matchMaker = new MatchMaker();
export const userSocketMap: Map<string, User> = new Map();
export const UserIDSet: Set<string> = new Set();
export const opponentRoomMap: Map<string, string> = new Map(); //socket id -> socket id

export const socketSetup = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("A user connected with ID:", socket.id);

    const handleLeaveMatch = async () => {
      const user = userSocketMap.get(socket.id);
      if (!user) return;

      if (opponentRoomMap.has(socket.id)) {
        const opponentSocketId = opponentRoomMap.get(socket.id);
        const opponentUser = userSocketMap.get(opponentSocketId as string);
        if (opponentSocketId && opponentUser) {
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
          io.to(opponentSocketId).emit(WIN_MATCH, {
            message: "Your opponent has left the match.",
          });
          opponentRoomMap.delete(opponentSocketId);
          UserIDSet.delete(opponentUser?._id as string);
          matchMaker.removePlayer(opponentSocketId);
        }
        opponentRoomMap.delete(socket.id);
        UserIDSet.delete(user._id as string);
        matchMaker.removePlayer(socket.id);
      }
    };

    socket.on(SETUSER, (UserData: User) => {
      userSocketMap.set(socket.id, UserData);
    });

    socket.on(START_MATCHMAKING, (info: any) => {
      const user = userSocketMap.get(socket.id);
      if (!user) return;

      if (UserIDSet.has(user._id as string)) {
        io.to(socket.id).emit(CANT_MATCHMAKE, {
          error: "You are already in a matchmaking queue or Match",
        });
        return;
      }

      UserIDSet.add(user._id as string);

      if (userSocketMap.get(socket.id)?.codeforces_info.rating) {
        matchMaker.addPlayer({
          id: socket.id,
          rating: userSocketMap.get(socket.id)?.codeforces_info.rating || 0,
          joinTime: Date.now(),
          queueType: info.mode,
        });
      }
    });

    socket.on(END_MATCHMAKING, (info: any) => {
      const user = userSocketMap.get(socket.id);
      if (!user) return;
      UserIDSet.delete(user._id as string);
      matchMaker.removePlayer(socket.id);
    });

    socket.on(OPPONENT_READY, ({ to }) => {
      io.to(to).emit(OPPONENT_READY);
    });

    socket.on(OPPONENT_LEFT, ({ to, mode }) => {
      io.to(to).emit(OPPONENT_LEFT);
      const user = userSocketMap.get(socket.id);
      if (!user) return;
      UserIDSet.delete(user._id as string);

      const remainingUser = userSocketMap.get(to);
      if (remainingUser?.codeforces_info.rating) {
        matchMaker.addPlayer({
          id: to,
          rating: remainingUser.codeforces_info.rating || 0,
          joinTime: Date.now(),
          queueType: mode,
        });
      }
    });

    socket.on(CREATE_ROOM, ({ lowerRating, upperRating, tags }) => {
      const user = userSocketMap.get(socket.id);
      if (!user) {
        return;
      }

      if (UserIDSet.has(user._id as string)) {
        io.to(socket.id).emit(CANT_MATCHMAKE, {
          error: "You are already in a matchmaking queue or Match",
        });
        return;
      }

      UserIDSet.add(user._id as string);

      const roomId = createRoom({
        player1_socketId: socket.id,
        lowerRating: lowerRating,
        upperRating: upperRating,
        tags: tags,
      });

      io.to(socket.id).emit(CREATE_ROOM, { roomId });
    });

    socket.on(JOIN_ROOM, async ({ roomId }) => {
      const user = userSocketMap.get(socket.id);
      if (!user) {
        io.to(socket.id).emit(CANT_JOIN_ROOM, "User not found");
        return;
      }

      if (UserIDSet.has(user._id as string)) {
        io.to(socket.id).emit(CANT_JOIN_ROOM, "You are already in a match");
        return;
      }

      try {
        const room = await joinRoom({
          player2_socketId: socket.id,
          roomId: roomId,
        });

        if (room.error) {
          io.to(socket.id).emit(CANT_JOIN_ROOM, room.error);
          return;
        }

        UserIDSet.add(user._id as string);

        const user1 = userSocketMap.get(room.player1);
        const user2 = userSocketMap.get(room.player2);

        if (!user1 || !user2) {
          UserIDSet.delete(user._id as string);
          io.to(socket.id).emit(CANT_JOIN_ROOM, "Player data not found");
          return;
        }

        const contestData1 = {
          roomId: roomId,
          lowerRating: room.lowerRating,
          upperRating: room.upperRating,
          tags: room.tags,
          you: user1,
          opponent: user2,
          opponentSocketId: room.player2,
          question: room.question,
        };

        const contestData2 = {
          roomId: roomId,
          lowerRating: room.lowerRating,
          upperRating: room.upperRating,
          tags: room.tags,
          you: user2,
          opponent: user1,
          opponentSocketId: room.player1,
          question: room.question,
        };

        io.to(room.player1).emit(START_CONTEST, contestData1);
        io.to(room.player2).emit(START_CONTEST, contestData2);
      } catch (error) {
        console.error(`JOIN_ROOM: Error processing room ${roomId}:`, error);
        io.to(socket.id).emit(CANT_JOIN_ROOM, "Failed to join room");
      }
    });

    socket.on(LEFT_ROOM, () => {
      const user = userSocketMap.get(socket.id);
      if (!user) return;
      UserIDSet.delete(user._id as string);
      removeSocketFromRoom(socket, io);
    });

    socket.on(STARTED_MATCH, ({ opponentSocketId }) => {
      opponentRoomMap.set(socket.id, opponentSocketId);
    });
    socket.on(MATCH_OVER,
      async ({ acceptedUserId, youId, opponentId, opponentSocketId }) => {
        const user = userSocketMap.get(socket.id);
        const opponentUser = userSocketMap.get(opponentSocketId);
        if (!user || user._id != youId || !opponentUser || !opponentUser._id)
          return;

        UserIDSet.delete(user._id as string);
        UserIDSet.delete(opponentUser._id as string);
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
        opponentRoomMap.delete(socket.id);
        opponentRoomMap.delete(opponentSocketId);
      }
    );

    socket.on(LEFT_MATCH,async () => {
      removeSocketFromRoom(socket, io);
      await handleLeaveMatch();
    });

    socket.on("disconnect",async () => {
      console.log("A user disconnected with ID:", socket.id);
      const user = userSocketMap.get(socket.id);
      if (!user) return;
      removeSocketFromRoom(socket, io);
      await handleLeaveMatch();
      userSocketMap.delete(socket.id);
    });
  });

  // Matchmaking interval
  setInterval(async () => {
    if (isMatching) return;
    isMatching = true;

    try {
      const matches = matchMaker.matchPlayers();
      for (const { queueType, players: [player1, player2] } of matches) {
        const user1 = userSocketMap.get(player1.id);
        const user2 = userSocketMap.get(player2.id);
        let lowerRating = 0;
        let upperRating = 0;
        if(queueType === "10") {
          lowerRating = 0;
          upperRating = 1300;
        } else if(queueType === "25") {
          lowerRating = 1400;
          upperRating = 1700;
        }
        else if(queueType === "40") {
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
            const roomId = Math.random()
              .toString(36)
              .substring(2, 15)
              .toUpperCase();

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
              UserIDSet.delete(user1._id as string);
              matchMaker.addPlayer(player1);
            }
            if (user2) {
              UserIDSet.delete(user2._id as string);
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
