
import prisma from '../config/db.js';

export async function findAll({
  status,
  categoryId,
  sortBy,
  order,
  offset,
  limit,
}) {
  return prisma.listing.findMany({
    where: {
      ...(status && { status }),
      ...(categoryId && { categoryId }),
    },
    include: {
      seller: {
        select: {
          id: true,
          name: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      [sortBy]: order,
    },
    skip: offset,
    take: limit,
  });
}

export async function findById(id) {
  return prisma.listing.findUnique({
    where: { id },
    include: {
      seller: {
        select: {
          id: true,
          name: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      bids: {
        orderBy: {
          amount: 'desc',
        },
      },
    },
  });
}

export async function create(data) {
  return prisma.listing.create({
    data: {
      title: data.title,
      startingPrice: data.startingPrice,
      categoryId: data.categoryId,
      sellerId: data.sellerId,
    },
    include: {
      seller: {
        select: {
          id: true,
          name: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

export async function update(id, data) {
  return prisma.listing.update({
    where: { id },
    data,
    include: {
      seller: {
        select: {
          id: true,
          name: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

export async function remove(id) {
  return prisma.listing.delete({
    where: { id },
  });
}
