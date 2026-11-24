import * as watchlistRepo from '../repositories/watchlistRepo.js';
import * as listingRepo from '../repositories/listingRepo.js';

function createError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export async function getWatchlist(userId) {
  return watchlistRepo.findByUserId(userId);
}

export async function addToWatchlist(userId, listingId) {
  const listing = await listingRepo.findById(listingId);

  if (!listing) {
    throw createError('Listing not found', 400);
  }

  const existing = await watchlistRepo.findByUserAndListing(
    userId,
    listingId
  );

  if (existing) {
    throw createError('Listing is already in your watchlist', 409);
  }

  return watchlistRepo.create(userId, listingId);
}

export async function removeFromWatchlist(userId, listingId) {
  const existing = await watchlistRepo.findByUserAndListing(
    userId,
    listingId
  );

  if (!existing) {
    throw createError('Listing is not in your watchlist', 404);
  }

  return watchlistRepo.remove(userId, listingId);
}