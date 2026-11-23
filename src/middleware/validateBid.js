import { body, param } from 'express-validator';

export const validateBidListingId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Listing ID must be a positive integer')
    .toInt(),
];

export const validateCreateBid = [
  body('amount')
    .isFloat({ gt: 0 })
    .withMessage('Bid amount must be greater than zero')
    .toFloat(),
];