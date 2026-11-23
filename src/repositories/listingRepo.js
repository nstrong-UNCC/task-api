
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

export async function closeListing(listingId) {
  return prisma.$transaction(async (tx) => {
    // Find all bids for this listing, highest first
    const bids = await tx.bid.findMany({
      where: { listingId },
      orderBy: { amount: 'desc' },
    });

    if (bids.length === 0) {
      const error = new Error('Cannot close a listing without bids');
      error.status = 400;
      throw error;
    }

    // Identify highest bid
    const highestBid = bids[0];

    // Accept highest bid
    await tx.bid.update({
      where: { id: highestBid.id },
      data: { status: 'ACCEPTED' },
    });

    // Reject all remaining bids
    await tx.bid.updateMany({
      where: {
        listingId,
        id: { not: highestBid.id },
      },
      data: { status: 'REJECTED' },
    });

    // Mark as SOLD
    return tx.listing.update({
      where: { id: listingId },
      data: { status: 'SOLD' },
      include: {
        seller: {
          select: { id: true, name: true },
        },
        category: {
          select: { id: true, name: true },
        },
        bids: {
          orderBy: { amount: 'desc' },
        },
      },
    });
  });
}
