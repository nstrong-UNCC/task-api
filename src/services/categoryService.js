
import * as categoryRepo from '../repositories/categoryRepo.js';

function createError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export async function getCategories() {
  return categoryRepo.findAll();
}

export async function getCategoryById(id) {
  const category = await categoryRepo.findById(id);

  if (!category) {
    throw createError('Category not found', 404);
  }

  return category;
}

export async function createCategory(data) {
  try {
    return await categoryRepo.create(data);
  } catch (error) {
    if (error.code === 'P2002') {
      throw createError('Category name already exists', 409);
    }

    throw error;
  }
}

export async function updateCategory(id, data) {
  await getCategoryById(id);

  try {
    return await categoryRepo.update(id, data);
  } catch (error) {
    if (error.code === 'P2002') {
      throw createError('Category name already exists', 409);
    }

    throw error;
  }
}
