
import * as categoryService from '../services/categoryService.js';

export async function getCategories(req, res, next) {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}

export async function getCategoryById(req, res, next) {
  try {
    const category = await categoryService.getCategoryById(
      Number(req.params.id)
    );

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}

export async function createCategory(req, res, next) {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const category = await categoryService.updateCategory(
      Number(req.params.id),
      req.body
    );

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}
