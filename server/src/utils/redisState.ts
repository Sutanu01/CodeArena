import { getRedisClient } from "../config/redis.js";
import type { User } from "../models/User.js";



const USER_SOCKET_PREFIX = "codearena:state:user_socket";
const ACTIVE_USERS_KEY = "codearena:state:active_users";
const OPPONENT_MAP_KEY = "codearena:state:opponent_map";


const USER_SOCKET_TTL = 3600;

export async function setUserSocket(socketId: string, user: User): Promise<void> {
  const redis = getRedisClient();
  const key = `${USER_SOCKET_PREFIX}:${socketId}`;

  const serialized = JSON.stringify({
    _id: user._id,
    username: user.username,
    clerkId: user.clerkId,
    avatar: user.avatar,
    codeforces_info: user.codeforces_info,
    total_matches: user.total_matches,
    total_wins: user.total_wins,
  });
  await redis.set(key, serialized, "EX", USER_SOCKET_TTL);
}


export async function getUserSocket(socketId: string): Promise<User | null> {
  const redis = getRedisClient();
  const key = `${USER_SOCKET_PREFIX}:${socketId}`;
  const data = await redis.get(key);
  if (!data) return null;
  try {
    return JSON.parse(data) as User;
  } catch {
    return null;
  }
}


export async function deleteUserSocket(socketId: string): Promise<void> {
  const redis = getRedisClient();
  await redis.del(`${USER_SOCKET_PREFIX}:${socketId}`);
}


export async function addActiveUser(userId: string): Promise<void> {
  const redis = getRedisClient();
  await redis.sadd(ACTIVE_USERS_KEY, userId);
}


export async function hasActiveUser(userId: string): Promise<boolean> {
  const redis = getRedisClient();
  return (await redis.sismember(ACTIVE_USERS_KEY, userId)) === 1;
}


export async function removeActiveUser(userId: string): Promise<void> {
  const redis = getRedisClient();
  await redis.srem(ACTIVE_USERS_KEY, userId);
}


export async function setOpponent(socketId: string, opponentSocketId: string): Promise<void> {
  const redis = getRedisClient();
  await redis.hset(OPPONENT_MAP_KEY, socketId, opponentSocketId);
}


export async function getOpponent(socketId: string): Promise<string | null> {
  const redis = getRedisClient();
  const result = await redis.hget(OPPONENT_MAP_KEY, socketId);
  return result || null;
}


export async function hasOpponent(socketId: string): Promise<boolean> {
  const redis = getRedisClient();
  return (await redis.hexists(OPPONENT_MAP_KEY, socketId)) === 1;
}


export async function deleteOpponent(socketId: string): Promise<void> {
  const redis = getRedisClient();
  await redis.hdel(OPPONENT_MAP_KEY, socketId);
}
