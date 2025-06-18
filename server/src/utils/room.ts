import { Server, Socket } from "socket.io";
import { userSocketMap } from "../socket.js";
import { getUnsolvedQuestionLink } from "./utility.js";
import { OPPONENT_LEFT_ROOM, ROOM_DISBAND } from "../constants/socketEvents.js";
export const ROOMS = new Map<string,any>();

export const createRoom = ({
    player1_socketId,
    lowerRating,
    upperRating,
    tags
}: {
    player1_socketId: string;
    lowerRating?: number;
    upperRating?: number;
    tags?: string[];
})=>{
    let roomId = Math.random().toString(36).substring(2, 15).toUpperCase();
    while(ROOMS.has(roomId)) {
        roomId = Math.random().toString(36).substring(2, 15).toUpperCase();
    }
    ROOMS.set(roomId, {
        owner: player1_socketId,
        player1:player1_socketId,
        player2: null,
        question: null,
        lowerRating: lowerRating || 800,
        upperRating: upperRating || 3500,
        tags: tags || [],
        createdAt: Date.now(),
    });
    return roomId;
}

export const  joinRoom = async ({
    player2_socketId,
    roomId
}: {
    player2_socketId: string;
    roomId: string;
})=>{
    const room = ROOMS.get(roomId);
    if(!room) {
        return { error: "Room not found" };
    }
    if(room.player2) {
        return { error: "Room is already full" };
    }
    room.player2 = player2_socketId;
    const question = await getUnsolvedQuestionLink({
          userId1: userSocketMap.get(room.player1)?._id as string,
          userId2: userSocketMap.get(room.player2)?._id as string,
          lowerRating: room.lowerRating,
          upperRating: room.upperRating,
          tags: room.tags,
        });
    room.question = question;
    return room;
}

export const deleteRoom = (roomId: string) => {
    if(ROOMS.has(roomId)) {
        ROOMS.delete(roomId);
        return true;
    }
    return false;
}


export const removeSocketFromRoom = (socket:Socket,io:Server) => {
    const room = Array.from(ROOMS.values()).find(
        (r) => r.player1 === socket.id || r.player2 === socket.id
      );
      if (room) {
        if (room.owner === socket.id) {
          io.to(room.player2).emit(ROOM_DISBAND, { roomId: room.roomId });
          ROOMS.delete(room.roomId);
        } else {
          io.to(room.player1).emit(OPPONENT_LEFT_ROOM, { roomId: room.roomId });
            room.player2 = null;
            room.question = null;
        }
      }
    return null;
}