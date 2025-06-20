import { Server, Socket } from "socket.io";
import {
  CANT_JOIN_ROOM,
  CANT_MATCHMAKE,
  CREATE_ROOM,
  END_MATCHMAKING,
  JOIN_ROOM,
  LEFT_ROOM,
  OPPONENT_LEFT,
  OPPONENT_READY,
  SETUSER,
  START_CONTEST,
  START_MATCHMAKING,
} from "./constants/socketEvents.js";
import { User } from "./models/User.js";
import { MatchMaker } from "./utils/matchmaking.js";
import { createRoom, joinRoom, removeSocketFromRoom } from "./utils/room.js";
import { getUnsolvedQuestionLink } from "./utils/utility.js";

let isMatching = false; // Flag to prevent overlapping matchmaking runs
const matchMaker = new MatchMaker();
export const userSocketMap: Map<string, User> = new Map();
export const UserIDSet: Set<string> = new Set();

export const socketSetup = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("A user connected with ID:", socket.id);

    socket.on(SETUSER, (UserData: User) => {
      console.log(`User ${UserData.username} (${UserData._id}) set on socket ${socket.id}`);
      userSocketMap.set(socket.id, UserData);
    });

    socket.on(START_MATCHMAKING, (info: any) => {
      const user = userSocketMap.get(socket.id);
      if (!user) {
        console.log(`START_MATCHMAKING: User not found for socket ${socket.id}`);
        return;
      }

      if (UserIDSet.has(user._id as string)) {
        io.to(socket.id).emit(CANT_MATCHMAKE, {
          error: "You are already in a matchmaking queue or Match",
        });
        return;
      }

      UserIDSet.add(user._id as string);
      console.log(`User ${user.username} added to matchmaking queue`);
      
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
      console.log(`User ${user.username} ended matchmaking`);
      UserIDSet.delete(user._id as string);
      matchMaker.removePlayer(socket.id);
    });

    socket.on(OPPONENT_READY, ({ to }) => {
      console.log(`OPPONENT_READY signal from ${socket.id} to ${to}`);
      io.to(to).emit(OPPONENT_READY);
    });

    socket.on(OPPONENT_LEFT, ({ to, mode }) => {
      console.log(`OPPONENT_LEFT signal from ${socket.id} to ${to}`);
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
        console.log(`CREATE_ROOM: User not found for socket ${socket.id}`);
        return;
      }

      if (UserIDSet.has(user._id as string)) {
        console.log(`CREATE_ROOM: User ${user.username} already in match/queue`);
        io.to(socket.id).emit(CANT_MATCHMAKE, {
          error: "You are already in a matchmaking queue or Match",
        });
        return;
      }

      UserIDSet.add(user._id as string);
      console.log(`User ${user.username} creating custom room`);
      
      const roomId = createRoom({
        player1_socketId: socket.id,
        lowerRating: lowerRating,
        upperRating: upperRating,
        tags: tags,
      });
      
      console.log(`Room ${roomId} created by ${user.username}`);
      io.to(socket.id).emit(CREATE_ROOM, { roomId });
    });

    socket.on(JOIN_ROOM, async ({ roomId }) => {
      console.log(`User ${socket.id} attempting to join room ${roomId}`);
      
      const user = userSocketMap.get(socket.id);
      if (!user) {
        console.log(`JOIN_ROOM: User not found for socket ${socket.id}`);
        io.to(socket.id).emit(CANT_JOIN_ROOM, "User not found");
        return;
      }

      if (UserIDSet.has(user._id as string)) {
        console.log(`JOIN_ROOM: User ${user.username} already in match/queue`);
        io.to(socket.id).emit(CANT_JOIN_ROOM, "You are already in a match");
        return;
      }

      try {
        const room = await joinRoom({
          player2_socketId: socket.id,
          roomId: roomId,
        });
        
        if (room.error) {
          console.log(`JOIN_ROOM: Error joining room ${roomId}: ${room.error}`);
          io.to(socket.id).emit(CANT_JOIN_ROOM, room.error);
          return;
        }

        UserIDSet.add(user._id as string);

        const user1 = userSocketMap.get(room.player1);
        const user2 = userSocketMap.get(room.player2);

        if (!user1 || !user2) {
          console.log(`JOIN_ROOM: Missing user data - User1: ${!!user1}, User2: ${!!user2}`);
          UserIDSet.delete(user._id as string);
          io.to(socket.id).emit(CANT_JOIN_ROOM, "Player data not found");
          return;
        }

        console.log(`Successfully matched users in room ${roomId}:`, {
          player1: user1.username,
          player2: user2.username,
          player1Socket: room.player1,
          player2Socket: room.player2
        });

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

        console.log(`Emitting START_CONTEST to ${user1.username} (${room.player1})`);
        io.to(room.player1).emit(START_CONTEST, contestData1);
        
        console.log(`Emitting START_CONTEST to ${user2.username} (${room.player2})`);
        io.to(room.player2).emit(START_CONTEST, contestData2);

      } catch (error) {
        console.error(`JOIN_ROOM: Error processing room ${roomId}:`, error);
        io.to(socket.id).emit(CANT_JOIN_ROOM, "Failed to join room");
      }
    });

    socket.on(LEFT_ROOM, () => {
      const user = userSocketMap.get(socket.id);
      if (!user) return;
      console.log(`User ${user.username} left room`);
      UserIDSet.delete(user._id as string);
      removeSocketFromRoom(socket, io);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected with ID:", socket.id);
      const user = userSocketMap.get(socket.id);
      removeSocketFromRoom(socket, io);
      if (user) {
        console.log(`Cleaning up user ${user.username} on disconnect`);
        UserIDSet.delete(user._id as string);
        matchMaker.removePlayer(socket.id);
      }
      userSocketMap.delete(socket.id);
    });
  });

  // Matchmaking interval
  setInterval(async () => {
    if (isMatching) return;
    isMatching = true;

    try {
      const matches = matchMaker.matchPlayers();
      for (const [player1, player2] of matches) {
        const user1 = userSocketMap.get(player1.id);
        const user2 = userSocketMap.get(player2.id);

        if (user1 && user2) {
          try {
            console.log(`Auto-matching ${user1.username} vs ${user2.username}`);
            const question = await getUnsolvedQuestionLink({
              userId1: user1._id as string,
              userId2: user2._id as string,
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
            
            console.log(`Match created: ${user1.username} vs ${user2.username} in room ${roomId}`);
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