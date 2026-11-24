import express from 'express';
import * as watchlistController from '../controllers/watchlistController.js';

import {
  validateWatchlistListingId,
} from '../middleware/validateWatchlist.js';

import {
  checkValidationResults,
} from '../middleware/handleValidationErrors.js';

import {
  authenticate,
} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get(
  '/',
  authenticate,
  watchlistController.getWatchlist
);

router.post(
  '/:listingId',
  authenticate,
  validateWatchlistListingId,
  checkValidationResults,
  watchlistController.addToWatchlist
);

router.delete(
  '/:listingId',
  authenticate,
  validateWatchlistListingId,
  checkValidationResults,
  watchlistController.removeFromWatchlist
);

export default router;