import { Request, Response, NextFunction } from 'express';
import { AuthorizationError } from '../errors/authorization-error';
import jsonwebtoken from 'jsonwebtoken';
import { config } from '../config/config';

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

export interface DecodedToken {
  email: string;
}

type DecodedUserToken = DecodedToken | null;

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    throw new AuthorizationError();
  }
  const [, token] = bearerToken.split(' ');
  const decoded = jsonwebtoken.verify(
    token,
    config.JWT_KEY
  ) as DecodedUserToken;
  if (!decoded) {
    throw new AuthorizationError();
  }
  req.user = decoded;
  next();
};

export interface RequestUser extends Request {
  user: DecodedToken;
}
