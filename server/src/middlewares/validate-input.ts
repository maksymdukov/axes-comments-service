import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { Request, Response, NextFunction } from 'express';

export const validateInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  next();
};
