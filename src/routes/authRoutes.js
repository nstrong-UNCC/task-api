import express from 'express';
import * as authController from '../controllers/authController.js';
import {
  validateSignup,
  validateLogin,
} from '../middleware/validateAuth.js';
import { checkValidationResults } from '../middleware/handleValidationErrors.js';

const router = express.Router();

router.post(
  '/signup',
  validateSignup,
  checkValidationResults,
  authController.signup
);

router.post(
  '/login',
  validateLogin,
  checkValidationResults,
  authController.login
);

export default router;