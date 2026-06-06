import RedisModule from "ioredis";
import type { RedisOptions } from "ioredis";
import dotenv from "dotenv";

dotenv.config();


const Redis = RedisModule.default ?? RedisModule;
type RedisClient = InstanceType<typeof Redis>;

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
  console.error("CRITICAL ERROR: REDIS_URL environment variable is not set.");
  process.exit(1);
}

export function buildRedisOptions(): RedisOptions {
  const parsedUrl = new URL(REDIS_URL!);
  const useTls = parsedUrl.protocol === "rediss:";

  return {
    host: parsedUrl.hostname,
    port: parseInt(parsedUrl.port, 10) || 6379,
    username: parsedUrl.username || "default",
    password: decodeURIComponent(parsedUrl.password),
    ...(useTls && { tls: { rejectUnauthorized: false } }),
    maxRetriesPerRequest: null, // Required by BullMQ
    enableReadyCheck: false,
    lazyConnect: true,
    retryStrategy(times: number) {
      const delay = Math.min(times * 200, 5000);
      console.warn(`[Redis] Reconnection attempt #${times}, retrying in ${delay}ms...`);
      return delay;
    },
  };
}

let singletonClient: RedisClient | null = null;


export function getRedisClient(): RedisClient {
  if (!singletonClient) {
    singletonClient = new Redis(buildRedisOptions());

    singletonClient.on("connect", () => {
      console.log("[Redis] Connected to Upstash Redis.");
    });

    singletonClient.on("error", (err: Error) => {
      console.error("[Redis] Connection error:", err.message);
    });

    singletonClient.on("close", () => {
      console.warn("[Redis] Connection closed.");
    });
  }
  return singletonClient;
}


export function createRedisClient(): RedisClient {
  const client = new Redis(buildRedisOptions());

  client.on("error", (err: Error) => {
    console.error("[Redis:Factory] Connection error:", err.message);
  });

  return client;
}

export async function closeRedis(): Promise<void> {
  if (singletonClient) {
    await singletonClient.quit();
    singletonClient = null;
    console.log("[Redis] Singleton connection closed.");
  }
}
