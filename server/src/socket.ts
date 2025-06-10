import { Server, Socket } from "socket.io";

// import { START_CONTEST,END_CONTEST } from "./constants/socketEvents.js";

export const socketSetup = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
