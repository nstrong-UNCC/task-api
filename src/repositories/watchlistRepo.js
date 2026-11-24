import prisma from '../config/db.js';

export async function findByUserId(userId) {
  return prisma.watchlist.findMany({
    where: { userId },
    include: {
      listing: {
        include: {
          seller: {
            select: { id: true, name: true },
          },
          category: {
            select: { id: true, name: true },
          },
        },
      },
    },
  });
}

export async function create(userId, listingId) {
  return prisma.watchlist.create({
    data: {
      userId,
      listingId,
    },
  });
}

export async function findByUserAndListing(userId, listingId) {
  return prisma.watchlist.findUnique({
    where: {
      userId_listingId: {
        userId,
        listingId,
      },
    },
  });
}

export async function remove(userId, listingId) {
  return prisma.watchlist.delete({
    where: {
      userId_listingId: {
        userId,
        listingId,
      },
    },
  });
}