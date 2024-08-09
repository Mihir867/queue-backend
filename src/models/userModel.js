import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (user) => {
  return await prisma.user.create({
    data: {
      email: user.email,
      password: user.password,
    },
  });
};

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};
