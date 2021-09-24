import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import uploadConfig from '@config/upload';
import { pagination } from 'typeorm-pagination';
import ratelimiter from './middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());

app.use(ratelimiter);

app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);
app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 500,
      message: error.message,
    });
  },
);

app.listen(process.env.APP_API_PORT, () => {
  console.log(`Server listening on port ${process.env.APP_API_PORT}! 🎉`);
});
