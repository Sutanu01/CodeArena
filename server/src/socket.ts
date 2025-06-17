import { Server, Socket } from "socket.io";
import { MatchMaker } from "./utils/matchmaking.js";
import {
  START_CONTEST,
  END_CONTEST,
  START_MATCHMAKING,
  END_MATCHMAKING,
  OPPONENT_READY,
  OPPONENT_LEFT,
} from "./constants/socketEvents.js";
import { User } from "./models/User.js";
import { getUnsolvedQuestionLink } from "./utils/utility.js";

let isMatching = false; // Flag to prevent overlapping matchmaking runs
const matchMaker = new MatchMaker();
export const userSocketMap: Map<string, User> = new Map();

export const socketSetup = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("A user connected with ID:", socket.id);
    socket.on("setUser", (UserData: User) => {
      userSocketMap.set(socket.id, UserData);
    });

    socket.on(START_MATCHMAKING, (info: any) => {
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
      const player = userSocketMap.get(socket.id);
      if (player) {
        matchMaker.queues[info.mode] = matchMaker.queues[info.mode].filter(
          (p) => p.id !== socket.id
        );
      }
    });

    socket.on(OPPONENT_READY, ({ to }) => {
      io.to(to).emit(OPPONENT_READY);
    });
    socket.on(OPPONENT_LEFT,({to,mode})=>{
      io.to(to).emit(OPPONENT_LEFT);
      if(userSocketMap.get(to)?.codeforces_info.rating){
      matchMaker.addPlayer({
          id: to,
          rating: userSocketMap.get(to)?.codeforces_info.rating || 0,
          joinTime: Date.now(),
          queueType: mode,
        });
      }
    })



    socket.on("disconnect", () => {
      console.log("A user disconnected with ID:", socket.id);
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
        const question = await getUnsolvedQuestionLink({
          userId1: user1._id as string,
          userId2: user2._id as string,
        });

        io.to(player1.id).emit(START_CONTEST, {
          you: user1,
          opponent: user2,
          opponentSocketId: player2.id,
          question,
        });

        io.to(player2.id).emit(START_CONTEST, {
          you: user2,
          opponent: user1,
          opponentSocketId: player1.id,
          question,
        });
      }
    }
  } catch (error) {
    console.error("Error during matchmaking:", error);
  } finally {
    isMatching = false;
  }
}, 1000);
};
