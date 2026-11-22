
import prisma from '../config/db.js';

export async function findAll() {
  return prisma.category.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}

export async function findById(id) {
  return prisma.category.findUnique({
    where: { id },
  });
}

export async function create(data) {
  return prisma.category.create({
    data: {
      name: data.name,
    },
  });
}

export async function update(id, data) {
  return prisma.category.update({
    where: { id },
    data: {
      name: data.name,
    },
  });
}
