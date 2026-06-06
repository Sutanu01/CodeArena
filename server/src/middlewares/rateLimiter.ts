import type { Request, Response, NextFunction, RequestHandler } from "express";
import type { Socket } from "socket.io";
import { getRedisClient } from "../config/redis.js";
import { getAuthUserId } from "../utils/features.js";

// ---------------------------------------------------------------------------
// Sliding Window Rate Limiter — ioredis + Lua Script
// Key Convention: codearena:ratelimit:{feature}:{identifier}
// ---------------------------------------------------------------------------

/**
 * Atomic Lua script implementing a sliding window counter.
 *
 * KEYS[1] = the rate limit key
 * ARGV[1] = max allowed requests (limit)
 * ARGV[2] = window size in milliseconds
 * ARGV[3] = current timestamp in milliseconds
 *
 * Returns 1 if request is allowed, 0 if rate limited.
 *
 * Uses `now:random` as the sorted set member to avoid collisions
 * when multiple requests arrive within the same millisecond.
 */
const SLIDING_WINDOW_LUA = `
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local clearBefore = now - window

redis.call('zremrangebyscore', key, 0, clearBefore)
local count = redis.call('zcard', key)
if count < limit then
    redis.call('zadd', key, now, tostring(now) .. ':' .. tostring(math.random(1000000)))
    redis.call('expire', key, math.ceil(window / 1000))
    return 1
else
    return 0
end
`;

export interface RateLimitConfig {
  keyPrefix: string;
  limit: number;
  windowMs: number;
}

export function createExpressRateLimiter(config: RateLimitConfig): RequestHandler {
  const { keyPrefix, limit, windowMs } = config;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const redis = getRedisClient();
      const identifier =
        getAuthUserId(req) || req.ip || req.socket.remoteAddress || "unknown";
      const key = `${keyPrefix}:${identifier}`;
      const now = Date.now();

      const allowed = await redis.eval(
        SLIDING_WINDOW_LUA,
        1,
        key,
        limit.toString(),
        windowMs.toString(),
        now.toString()
      );

      if (allowed === 1) {
        next();
        return;
      }

      // Rate limited
      const retryAfterSeconds = Math.ceil(windowMs / 1000);
      res.set("Retry-After", retryAfterSeconds.toString());
      res.status(429).json({
        success: false,
        message: "Too many requests. Please try again later.",
        retryAfter: retryAfterSeconds,
      });
    } catch (err) {
      console.error("[RateLimiter] Redis error, failing open:", err);
      next();
    }
  };
}


export interface SocketRateLimitRule {
  eventName: string;
  keyPrefix: string;
  limit: number;
  windowMs: number;
}


export function applySocketRateLimiter(
  socket: Socket,
  rules: SocketRateLimitRule[]
): void {
  const ruleMap = new Map<string, SocketRateLimitRule>();
  for (const rule of rules) {
    ruleMap.set(rule.eventName, rule);
  }

  socket.use(async (packet, next) => {
    const eventName = packet[0];
    const rule = ruleMap.get(eventName);
    if (!rule) {
      next();
      return;
    }

    try {
      const redis = getRedisClient();
      const key = `${rule.keyPrefix}:${socket.id}`;
      const now = Date.now();

      const allowed = await redis.eval(
        SLIDING_WINDOW_LUA,
        1,
        key,
        rule.limit.toString(),
        rule.windowMs.toString(),
        now.toString()
      );

      if (allowed === 1) {
        next();
      } else {
        console.warn(
          `[RateLimiter:Socket] Rate limited socket ${socket.id} on event "${eventName}"`
        );
        socket.emit("RATE_LIMITED", {
          message: `Too many "${eventName}" requests. Please slow down.`,
          event: eventName,
        });
      }
    } catch (err) {
      console.error("[RateLimiter:Socket] Redis error, failing open:", err);
      next();
    }
  });
}
