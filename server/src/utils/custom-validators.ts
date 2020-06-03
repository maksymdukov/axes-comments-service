import { CommentStatus } from '../models/comments/status';
import { query } from 'express-validator';
import mongoose from 'mongoose';

export const checkCommentStatus = (input: CommentStatus) => {
  if (!Object.values(CommentStatus).includes(input)) {
    throw new Error();
  }
  return true;
};

export const checkArrayOfIds = (input: string[]) => {
  const valid = input.every((id) => mongoose.Types.ObjectId.isValid(id));
  if (!valid) {
    throw new Error('Must be an array of valid ids');
  }
  return true;
};

export const validateStatusQuery = query('status')
  .optional()
  .custom(checkCommentStatus)
  .withMessage('Should be either approved, pending, cancelled');

export const validatePagination = [
  query('page').optional().isInt({ min: 1 }),
  query('size').optional().isInt({ min: 2, max: 100 }),
];
