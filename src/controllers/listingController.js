
import * as listingService from '../services/listingService.js';

// Get all listings
export async function getListings(req, res, next) {
  try {
    const listings = await listingService.getListings(req.query);
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
}

// Get one listing
export async function getListingById(req, res, next) {
  try {
    const listing = await listingService.getListingById(
      Number(req.params.id)
    );

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
}

// Create a listing
export async function createListing(req, res, next) {
  try {
    const listing = await listingService.createListing(
      req.body,
      req.user
    );

    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
}

// Update a listing
export async function updateListing(req, res, next) {
  try {
    // Only allow these fields to be updated
    const updateData = {};

    for (const field of ['title', 'startingPrice', 'categoryId']) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updateData[field] = req.body[field];
      }
    }

    const listing = await listingService.updateListing(
      Number(req.params.id),
      updateData,
      req.user
    );

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
}

// Delete a listing
export async function deleteListing(req, res, next) {
  try {
    await listingService.deleteListing(
      Number(req.params.id),
      req.user
    );

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function closeListing(req, res, next) {
  try {
    const listing = await listingService.closeListing(
      Number(req.params.id),
      req.user
    );

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
}