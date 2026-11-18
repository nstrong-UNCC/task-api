import { body } from 'express-validator';

export const validateSignup = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('A valid email is required')
    .normalizeEmail(),

  body('password')
    .isString()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),

  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
];

export const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('A valid email is required')
    .normalizeEmail(),

  body('password')
    .isString()
    .notEmpty()
    .withMessage('Password is required'),
];