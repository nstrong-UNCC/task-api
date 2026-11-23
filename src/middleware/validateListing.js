
import { body, param, query } from 'express-validator';

// Validate listing ID parameters
export const validateListingId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Listing ID must be a positive integer')
    .toInt(),
];

// Validate listing search filters
export const validateListingQuery = [
  query('status')
    .optional()
    .isIn(['OPEN', 'SOLD'])
    .withMessage('Status must be OPEN or SOLD'),

  query('categoryId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Category ID must be a positive integer')
    .toInt(),

  query('sortBy')
    .optional()
    .isIn(['createdAt', 'startingPrice'])
    .withMessage('sortBy must be createdAt or startingPrice'),

  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Order must be asc or desc'),

  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be zero or greater')
    .toInt(),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
    .toInt(),
];

// Validate listing creation
export const validateCreateListing = [
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Title is required'),

  body('startingPrice')
    .isFloat({ gt: 0 })
    .withMessage('Starting price must be greater than zero')
    .toFloat(),

  body('categoryId')
    .isInt({ min: 1 })
    .withMessage('Category ID must be a positive integer')
    .toInt(),
];

// Validate listing updates
export const validateUpdateListing = [
  body('title')
    .optional()
    .isString()
    .withMessage('Title must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty'),

  body('startingPrice')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Starting price must be greater than zero')
    .toFloat(),

  body('categoryId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Category ID must be a positive integer')
    .toInt(),

  body().custom((value) => {
    const allowedFields = ['title', 'startingPrice', 'categoryId'];

    const hasValidField = allowedFields.some((field) =>
      Object.prototype.hasOwnProperty.call(value, field)
    );

    if (!hasValidField) {
      throw new Error('At least one listing field must be provided');
    }

    return true;
  }),
];
