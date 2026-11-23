
import * as listingRepo from '../repositories/listingRepo.js';
import * as categoryRepo from '../repositories/categoryRepo.js';

function createError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

// Get all listings
export async function getListings(filters) {
  return listingRepo.findAll({
    status: filters.status,
    categoryId: filters.categoryId,
    sortBy: filters.sortBy || 'createdAt',
    order: filters.order || 'desc',
    offset: filters.offset ?? 0,
    limit: filters.limit ?? 10,
  });
}

// Get one listing
export async function getListingById(id) {
  const listing = await listingRepo.findById(id);

  if (!listing) {
    throw createError('Listing not found', 404);
  }

  return listing;
}

// Create a listing
export async function createListing(data, user) {
  if (user.role !== 'USER') {
    throw createError('Only users can create listings', 403);
  }

  const category = await categoryRepo.findById(data.categoryId);

  if (!category) {
    throw createError('Category not found', 400);
  }

  return listingRepo.create({
    title: data.title,
    startingPrice: data.startingPrice,
    categoryId: data.categoryId,
    sellerId: user.id,
  });
}

// Update an existing listing
export async function updateListing(id, data, user) {
  const listing = await listingRepo.findById(id);

  if (!listing) {
    throw createError('Listing not found', 404);
  }

  if (listing.sellerId !== user.id) {
    throw createError('You can only update your own listings', 403);
  }

  if (listing.status !== 'OPEN') {
    throw createError('Only open listings can be updated', 400);
  }

  if (data.categoryId !== undefined) {
    const category = await categoryRepo.findById(data.categoryId);

    if (!category) {
      throw createError('Category not found', 400);
    }
  }

  return listingRepo.update(id, data);
}

// Delete a listing
export async function deleteListing(id, user) {
  const listing = await listingRepo.findById(id);

  if (!listing) {
    throw createError('Listing not found', 404);
  }

  const isOwner = listing.sellerId === user.id;
  const isAdmin = user.role === 'ADMIN';

  if (!isOwner && !isAdmin) {
    throw createError('You do not have permission to delete this listing', 403);
  }

  if (listing.status !== 'OPEN') {
    throw createError('Only open listings can be deleted', 400);
  }

  await listingRepo.remove(id);
}

export async function closeListing(id, user) {
  const listing = await listingRepo.findById(id);

  if (!listing) {
    throw createError('Listing not found', 404);
  }

  // Only the seller can close the listing
  if (listing.sellerId !== user.id) {
    throw createError('You can only close your own listings', 403);
  }

  // Listing must be OPEN
  if (listing.status !== 'OPEN') {
    throw createError('Listing is already closed', 400);
  }

  // A listing must have at least one bid
  if (listing.bids.length === 0) {
    throw createError('Cannot close a listing without bids', 400);
  }

  return listingRepo.closeListing(id);
}
