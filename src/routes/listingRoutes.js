
import express from 'express';
import * as listingController from '../controllers/listingController.js';
import * as bidController from '../controllers/bidController.js';


import {
  validateListingId,
  validateListingQuery,
  validateCreateListing,
  validateUpdateListing,
} from '../middleware/validateListing.js';

import {
  validateBidListingId,
  validateCreateBid,
} from '../middleware/validateBid.js';

import { checkValidationResults } from '../middleware/handleValidationErrors.js';

import {
  authenticate,
  authorize,
} from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all listings (Public)
router.get(
  '/',
  validateListingQuery,
  checkValidationResults,
  listingController.getListings
);

// Get one listing (Public)
router.get(
  '/:id',
  validateListingId,
  checkValidationResults,
  listingController.getListingById
);

// Create a listing (USER only)
router.post(
  '/',
  authenticate,
  authorize('USER'),
  validateCreateListing,
  checkValidationResults,
  listingController.createListing
);

// Update your own listing (Authenticated)
router.put(
  '/:id',
  authenticate,
  validateListingId,
  validateUpdateListing,
  checkValidationResults,
  listingController.updateListing
);

// Delete a listing (Owner or ADMIN)
router.delete(
  '/:id',
  authenticate,
  validateListingId,
  checkValidationResults,
  listingController.deleteListing
);

// Place a bid on a listing (USER only)
router.post(
  '/:id/bids',
  authenticate,
  authorize('USER'),
  validateBidListingId,
  validateCreateBid,
  checkValidationResults,
  bidController.placeBid
);

// Close a listing and process bids (Owner only)
router.patch(
  '/:id/status',
  authenticate,
  validateListingId,
  checkValidationResults,
  listingController.closeListing
);

export default router;
