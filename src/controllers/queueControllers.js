import { enqueueRequest, processQueue } from '../services/queueServices.js';

export const handleRequest = async (req, res) => {
  const { userId, requestData } = req.body;

  await enqueueRequest(userId, requestData);
  await processQueue(userId);

  res.status(200).json({ message: 'Request enqueued and processed' });
};
