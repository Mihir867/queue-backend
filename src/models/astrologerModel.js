import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllAstrologers = async () => {
  return await prisma.astrologer.findMany({
    include: {
      flows: true, 
    },
  });
};

export const updateAstrologerFlow = async (id, increment) => {
  return await prisma.flow.updateMany({
    where: { astrologerId: id },
    data: { userCount: { increment } },
  });
};

export const resetFlow = async (id) => {
  return await prisma.flow.updateMany({
    where: { astrologerId: id },
    data: { userCount: 0 },
  });
};
