/**
 * Rate Limiting
 */

import { config } from "@/lib/config";
import NodeCache from "node-cache";

const rateLimitCache = new NodeCache({
  stdTTL: config.rateLimitWindow,
  checkperiod: 60,
});

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function checkRateLimit(identifier: string): RateLimitResult {
  if (!config.rateLimitEnabled) {
    return {
      allowed: true,
      remaining: Infinity,
      resetAt: Date.now() + config.rateLimitWindow * 1000,
    };
  }

  const key = `ratelimit:${identifier}`;
  const current = (rateLimitCache.get<number>(key) || 0) as number;

  if (current >= config.rateLimitMax) {
    const ttl = rateLimitCache.getTtl(key) || Date.now() + config.rateLimitWindow * 1000;
    return {
      allowed: false,
      remaining: 0,
      resetAt: ttl,
    };
  }

  rateLimitCache.set(key, current + 1);
  const remaining = config.rateLimitMax - (current + 1);
  const ttl = rateLimitCache.getTtl(key) || Date.now() + config.rateLimitWindow * 1000;

  return {
    allowed: true,
    remaining,
    resetAt: ttl,
  };
}

export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  return forwarded?.split(",")[0] || realIp || cfConnectingIp || "unknown";
}


