import * as bidRepo from '../repositories/bidRepo.js';
import * as listingRepo from '../repositories/listingRepo.js';

function createError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export async function placeBid(listingId, amount, user) {
  // Only USER accounts can place bids
  if (user.role !== 'USER') {
    throw createError('Only users can place bids', 403);
  }

  
  const listing = await listingRepo.findById(listingId);

  if (!listing) {
    throw createError('Listing not found', 404);
  }


  if (listing.status !== 'OPEN') {
    throw createError('Cannot bid on a closed listing', 400);
  }

  // Users cannot bid on their own listings
  if (listing.sellerId === user.id) {
    throw createError('You cannot bid on your own listing', 403);
  }

  // Find the current highest bid
  const highestBid = await bidRepo.findHighestBid(listingId);

  // Determine the minimum acceptable bid
  const minimumBid = highestBid
    ? Number(highestBid.amount)
    : Number(listing.startingPrice);

  if (amount <= minimumBid) {
    throw createError(
      `Bid must be greater than ${minimumBid}`,
      400
    );
  }

  return bidRepo.create({
    amount,
    bidderId: user.id,
    listingId,
  });
}