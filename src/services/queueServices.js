
import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379' 
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

await redisClient.connect();
export default redisClient;

export const enqueueRequest = async (userId, request) => {
  const queueKey = `queue:${userId}`;
  await redisClient.rPush(queueKey, JSON.stringify(requestData));
};

export const dequeueRequest = async (userId) => {
  const queueKey = `queue:${userId}`;
  const request = await redisClient.lPop(queueKey);
  return JSON.parse(request);
};

export const processQueue = async (userId) => {
  const queueKey = `queue:${userId}`;
  
  while (true) {
    const requestData = await redisClient.lPop(queueKey);
    
    if (!requestData) {
      break; 
    }

    const request = JSON.parse(requestData);
    
    // Process the request
    await handleRequestLogic(userId, request);
  }
};

