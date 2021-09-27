import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is required');
  }

  const [, token] = authHeader.split(' ');

  try {
    if (authConfig.jwt.secret === undefined) {
      throw new AppError('Auth Error');
    }
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as JwtPayload;

    if (sub === undefined) {
      throw new AppError('User Id invalid or missing');
    }

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token');
  }
}
