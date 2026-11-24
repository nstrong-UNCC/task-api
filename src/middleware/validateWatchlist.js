import { param } from 'express-validator';

export const validateWatchlistListingId = [
  param('listingId')
    .isInt({ min: 1 })
    .withMessage('Listing ID must be a positive integer')
    .toInt(),
];