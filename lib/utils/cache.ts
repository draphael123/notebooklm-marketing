/**
 * Response Caching
 */

import NodeCache from "node-cache";
import { config } from "@/lib/config";
import { createHash } from "crypto";

const cache = new NodeCache({
  stdTTL: config.cacheTTL,
  checkperiod: 600, // Check for expired keys every 10 minutes
});

export function getCacheKey(question: string): string {
  const normalized = question.toLowerCase().trim();
  return createHash("md5").update(normalized).digest("hex");
}

export function getCachedResponse(question: string): any | undefined {
  if (!config.enableCaching) return undefined;

  const key = getCacheKey(question);
  return cache.get(key);
}

export function setCachedResponse(question: string, response: any): void {
  if (!config.enableCaching) return;

  const key = getCacheKey(question);
  cache.set(key, response);
}

export function clearCache(): void {
  cache.flushAll();
}

export function getCacheStats() {
  return cache.getStats();
}

