import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

export const redis = new Redis(redisUrl, {
  lazyConnect: true,
  maxRetriesPerRequest: 1,
  enableOfflineQueue: false,
});

redis.on("error", () => {
  // Redis is optional for local bootstrapping; failures fall back to the mock dataset.
});

export async function withCachedValue<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds = 180,
): Promise<T> {
  try {
    await redis.connect();
    const cached = await redis.get(key);

    if (cached) {
      return JSON.parse(cached) as T;
    }

    const value = await fetcher();
    await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
    return value;
  } catch {
    return fetcher();
  }
}
