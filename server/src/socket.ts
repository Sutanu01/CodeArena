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
  START_MATCHMAKING
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
      if (userSocketMap.get(to)?.codeforces_info.rating) {
        matchMaker.addPlayer({
          id: to,
          rating: userSocketMap.get(to)?.codeforces_info.rating || 0,
          joinTime: Date.now(),
          queueType: mode,
        });
      }
    });
    
    socket.on(CREATE_ROOM, ({ lowerRating, upperRating, tags }) => {
      const user = userSocketMap.get(socket.id);
      if (!user) return;
      
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
      const room = await joinRoom({
        player2_socketId: socket.id,
        roomId: roomId,
      });
      if (room.error) {
        io.to(socket.id).emit(CANT_JOIN_ROOM, room.error);
        return;
      }
      const user = userSocketMap.get(socket.id);
      UserIDSet.add(user?._id as string);
      io.to(room.player1).emit(START_CONTEST, {
        roomId: roomId,
        lowerRating: room.lowerRating,
        upperRating: room.upperRating,
        tags: room.tags,
        you: userSocketMap.get(room.player1),
        opponent: userSocketMap.get(room.player2),
        opponentSocketId: room.player2,
        question: room.question,
      });
      io.to(room.player2).emit(START_CONTEST, {
        roomId: roomId,
        lowerRating: room.lowerRating,
        upperRating: room.upperRating,
        tags: room.tags,
        you: userSocketMap.get(room.player2),
        opponent: userSocketMap.get(room.player1),
        opponentSocketId: room.player1,
        question: room.question,
      });
    });
    
    socket.on(LEFT_ROOM, () => {
      const user = userSocketMap.get(socket.id);
      if (!user) return;
      UserIDSet.delete(user._id as string);
      removeSocketFromRoom(socket, io);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected with ID:", socket.id);
      const user = userSocketMap.get(socket.id);
      removeSocketFromRoom(socket, io);
      if (user) {
        UserIDSet.delete(user._id as string);
        matchMaker.removePlayer(socket.id);
      }
      userSocketMap.delete(socket.id);
    });
  });
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
            const question = await getUnsolvedQuestionLink({
              userId1: user1._id as string,
              userId2: user2._id as string,
            }); 
            const roomId = Math.random().toString(36).substring(2, 15).toUpperCase();
            io.to(player1.id).emit(START_CONTEST, {
              roomId,
              you: user1,
              opponent: user2,
              opponentSocketId: player2.id,
              question,
            });
            io.to(player2.id).emit(START_CONTEST, {
              roomId,
              you: user2,
              opponent: user1,
              opponentSocketId: player1.id,
              question,
            });
            
          } catch (questionError) {
            console.error("Error getting question for match:", questionError);
            const user1 = userSocketMap.get(player1.id);
            const user2 = userSocketMap.get(player2.id);
            
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