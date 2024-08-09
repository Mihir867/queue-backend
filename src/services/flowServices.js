import { getAllAstrologers, updateAstrologerFlow, resetFlow } from '../models/astrologerModel.js';

export const distributeUsers = async (userId) => {
  const astrologers = await getAllAstrologers();

  // Ensure astrologers and their flows are correctly retrieved
  if (!astrologers || astrologers.length === 0) {
    throw new Error('No astrologers found');
  }

  // Sort astrologers based on their current flow (ascending)
  const sortedAstrologers = astrologers.sort((a, b) => {
    const aUserCount = a.flows.reduce((sum, flow) => sum + (flow.userCount || 0), 0);
    const bUserCount = b.flows.reduce((sum, flow) => sum + (flow.userCount || 0), 0);
    return aUserCount - bUserCount;
  });

  // Ensure there is at least one astrologer to assign
  if (sortedAstrologers.length === 0) {
    throw new Error('No astrologers available for distribution');
  }

  const selectedAstrologer = sortedAstrologers[0];

  // Check if selectedAstrologer has an id
  if (!selectedAstrologer.id) {
    throw new Error('Selected astrologer does not have an ID');
  }

  await updateAstrologerFlow(selectedAstrologer.id, 1);

  return selectedAstrologer;
};


export const toggleTopAstrologer = async (id, isTopAstro) => {
    if (isTopAstro) {
      // Adjust the logic for top astrologers
    } else {
      await resetFlow(id);
    }
  };
