import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
});

export const enqueueRequest = async (userId, request) => {
  const queueKey = `queue:${userId}`;
  await redis.rpush(queueKey, JSON.stringify(request));
};

export const dequeueRequest = async (userId) => {
  const queueKey = `queue:${userId}`;
  const request = await redis.lpop(queueKey);
  return JSON.parse(request);
};

export const processQueue = async (userId) => {
  let request;
  while ((request = await dequeueRequest(userId)) !== null) {
    // Process request
  }
};
