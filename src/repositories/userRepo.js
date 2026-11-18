import prisma from '../config/db.js';

export async function findByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(data) {
  return prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
      name: data.name,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });
}