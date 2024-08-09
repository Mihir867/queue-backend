import { distributeUsers, toggleTopAstrologer } from '../services/flowServices.js';

export const allocateUser = async (req, res) => {
  try {
    const astrologer = await distributeUsers(req.body.userId);
    res.status(200).json({ success: true, astrologer });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const toggleAstrologerFlow = async (req, res) => {
  try {
    await toggleTopAstrologer(req.params.id, req.body.isTopAstro);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
