import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepo from '../repositories/userRepo.js';

function createError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export async function signup({ email, password, name }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    return await userRepo.createUser({
      email,
      password: hashedPassword,
      name,
    });
  } catch (error) {
    if (error.code === 'P2002') {
      throw createError('Email is already registered', 409);
    }

    throw error;
  }
}

export async function login({ email, password }) {
  const user = await userRepo.findByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createError('Invalid email or password', 401);
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  const accessToken = jwt.sign(
    {
      sub: user.id,
      role: user.role,
    },
    secret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    }
  );

  return { accessToken };
}