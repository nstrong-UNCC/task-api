
import { body, param } from 'express-validator';

export const validateCategoryId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Category ID must be a positive integer')
    .toInt(),
];

export const validateCreateCategory = [
  body('name')
    .isString()
    .withMessage('Category name must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Category name is required'),
];

export const validateUpdateCategory = [
  body('name')
    .isString()
    .withMessage('Category name must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Category name is required'),
];
