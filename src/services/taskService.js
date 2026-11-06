import * as taskRepository from '../repositories/taskRepo.js';

export async function getAllTasks(completed) {
  return taskRepository.findAll(
    completed === undefined ? undefined : completed === 'true'
  );
}

export async function createTask(newTask) {
  return taskRepository.create(newTask);
}