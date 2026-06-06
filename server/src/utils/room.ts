import { Server, Socket } from "socket.io";
import crypto from "crypto";
import { getRedisClient } from "../config/redis.js";
import { getUnsolvedQuestionLink } from "./utility.js";
import { OPPONENT_LEFT_ROOM, ROOM_DISBAND } from "../constants/socketEvents.js";
import {
  getUserSocket,
  removeActiveUser,
} from "./redisState.js";


const ROOM_KEY_PREFIX = "codearena:state:room";
const SOCKET_ROOM_KEY_PREFIX = "codearena:state:socket_room";
const ROOM_TTL_SECONDS = 3600; // 1 hour

export interface RoomData {
  owner: string;
  player1: string;
  player2: string | null;
  question: string | null;
  lowerRating: number;
  upperRating: number;
  tags: string[];
  createdAt: number;
}


export const createRoom = async ({
  player1_socketId,
  lowerRating,
  upperRating,
  tags,
}: {
  player1_socketId: string;
  lowerRating?: number;
  upperRating?: number;
  tags?: string[];
}): Promise<string> => {
  const redis = getRedisClient();

  let roomId = crypto.randomBytes(6).toString("hex").toUpperCase();


  while (await redis.exists(`${ROOM_KEY_PREFIX}:${roomId}`)) {
    roomId = crypto.randomBytes(6).toString("hex").toUpperCase();
  }

  const roomData: Record<string, string> = {
    owner: player1_socketId,
    player1: player1_socketId,
    player2: "",
    question: "",
    lowerRating: String(lowerRating || 800),
    upperRating: String(upperRating || 3500),
    tags: JSON.stringify(tags || []),
    createdAt: String(Date.now()),
  };

  const roomKey = `${ROOM_KEY_PREFIX}:${roomId}`;
  await redis.hset(roomKey, roomData);
  await redis.expire(roomKey, ROOM_TTL_SECONDS);

  await redis.set(
    `${SOCKET_ROOM_KEY_PREFIX}:${player1_socketId}`,
    roomId,
    "EX",
    ROOM_TTL_SECONDS
  );

  return roomId;
};

export type JoinRoomError = { ok: false; error: string };
export type JoinRoomSuccess = {
  ok: true;
  player1: string;
  player2: string;
  question: any;
  lowerRating: number;
  upperRating: number;
  tags: string[];
};
export type JoinRoomResult = JoinRoomError | JoinRoomSuccess;


export const joinRoom = async ({
  player2_socketId,
  roomId,
}: {
  player2_socketId: string;
  roomId: string;
}): Promise<JoinRoomResult> => {
  const redis = getRedisClient();
  const roomKey = `${ROOM_KEY_PREFIX}:${roomId}`;

  const rawRoom = await redis.hgetall(roomKey);
  if (!rawRoom || Object.keys(rawRoom).length === 0) {
    return { ok: false, error: "Room not found" };
  }
  if (rawRoom.player2 && rawRoom.player2 !== "") {
    return { ok: false, error: "Room is already full" };
  }

  const user1 = await getUserSocket(rawRoom.player1);
  const user2 = await getUserSocket(player2_socketId);

  if (!user1 || !user2) {
    return { ok: false, error: "Player data not found" };
  }

  const lowerRating = parseInt(rawRoom.lowerRating, 10);
  const upperRating = parseInt(rawRoom.upperRating, 10);
  const tags: string[] = JSON.parse(rawRoom.tags || "[]");

  const question = await getUnsolvedQuestionLink({
    userId1: user1._id as string,
    userId2: user2._id as string,
    lowerRating,
    upperRating,
    tags,
  });

  await redis.hset(roomKey, {
    player2: player2_socketId,
    question: JSON.stringify(question),
  });


  await redis.set(
    `${SOCKET_ROOM_KEY_PREFIX}:${player2_socketId}`,
    roomId,
    "EX",
    ROOM_TTL_SECONDS
  );

  return {
    ok: true,
    player1: rawRoom.player1,
    player2: player2_socketId,
    question,
    lowerRating,
    upperRating,
    tags,
  };
};


export const deleteRoom = async (roomId: string): Promise<boolean> => {
  const redis = getRedisClient();
  const roomKey = `${ROOM_KEY_PREFIX}:${roomId}`;

  const rawRoom = await redis.hgetall(roomKey);
  if (!rawRoom || Object.keys(rawRoom).length === 0) return false;

  // Clean up reverse indexes
  if (rawRoom.player1) {
    await redis.del(`${SOCKET_ROOM_KEY_PREFIX}:${rawRoom.player1}`);
  }
  if (rawRoom.player2 && rawRoom.player2 !== "") {
    await redis.del(`${SOCKET_ROOM_KEY_PREFIX}:${rawRoom.player2}`);
  }

  await redis.del(roomKey);
  return true;
};


export const removeSocketFromRoom = async (
  socket: Socket,
  io: Server
): Promise<void> => {
  const redis = getRedisClient();
  const reverseKey = `${SOCKET_ROOM_KEY_PREFIX}:${socket.id}`;

  const roomId = await redis.get(reverseKey);
  if (!roomId) return;

  const roomKey = `${ROOM_KEY_PREFIX}:${roomId}`;
  const rawRoom = await redis.hgetall(roomKey);

  if (!rawRoom || Object.keys(rawRoom).length === 0) {
    await redis.del(reverseKey);
    return;
  }

  const { getOpponent } = await import("./redisState.js");
  const hasOpponent = await getOpponent(socket.id);

  if (hasOpponent) {
    await deleteRoom(roomId);
  } else {

    if (rawRoom.owner === socket.id) {

      if (rawRoom.player2 && rawRoom.player2 !== "") {
        io.to(rawRoom.player2).emit(ROOM_DISBAND, { roomId });
        const opponent = await getUserSocket(rawRoom.player2);
        if (opponent) {
          await removeActiveUser(opponent._id as string);
        }
      }
      await deleteRoom(roomId);
    } else {

      io.to(rawRoom.player1).emit(OPPONENT_LEFT_ROOM, { roomId });
      await redis.hset(roomKey, { player2: "", question: "" });
      await redis.del(reverseKey);
    }
  }
};
