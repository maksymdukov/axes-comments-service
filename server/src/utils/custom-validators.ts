import { CommentStatus } from '../models/comments/status';
import { query } from 'express-validator';
import mongoose from 'mongoose';
import { OrderStatus } from '../models/orders/status';

export const checkStatus = <T>(statuses: T) => (input: string) => {
  if (!Object.values(statuses).includes(input)) {
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

export const validateStatus = <T = any>(statuses: T) =>
  query('status')
    .optional()
    .custom(checkStatus(statuses))
    .withMessage(`Should be either ${Object.values(statuses).join(' ')}`);

export const validateCommentStatus = validateStatus(CommentStatus);
export const validateOrderStatus = validateStatus(OrderStatus);

export const validatePagination = [
  query('page').optional().isInt({ min: 1 }),
  query('size').optional().isInt({ min: 2, max: 100 }),
];
