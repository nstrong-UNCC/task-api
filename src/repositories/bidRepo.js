import prisma from '../config/db.js';

export async function findHighestBid(listingId) {
  return prisma.bid.findFirst({
    where: { listingId },
    orderBy: { amount: 'desc' },
  });
}

export async function create(data) {
  return prisma.bid.create({
    data: {
      amount: data.amount,
      bidderId: data.bidderId,
      listingId: data.listingId,
    },
  });
}

export async function findByListingId(listingId) {
  return prisma.bid.findMany({
    where: { listingId },
    orderBy: { amount: 'desc' },
  });
}