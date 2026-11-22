
import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
import {
  validateCategoryId,
  validateCreateCategory,
  validateUpdateCategory,
} from '../middleware/validateCategory.js';
import { checkValidationResults } from '../middleware/handleValidationErrors.js';
import {
  authenticate,
  authorize,
} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', categoryController.getCategories);

router.get(
  '/:id',
  validateCategoryId,
  checkValidationResults,
  categoryController.getCategoryById
);

router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  validateCreateCategory,
  checkValidationResults,
  categoryController.createCategory
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  validateCategoryId,
  validateUpdateCategory,
  checkValidationResults,
  categoryController.updateCategory
);

export default router;
