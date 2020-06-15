/* eslint-disable no-console */
import 'reflect-metadata';
// -- Para uso das variáveis de ambiente
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import { errors } from 'celebrate';

import 'express-async-errors';

import AppError from '@shared/erros/AppError';

import routes from './routes';
import '@shared/infra/mongoose';
import '@shared/container';

const app = express();
app.use(cors());

app.use(express.json());

app.use(routes);

// -- Para que os erros do celebrate sejam exibidos como resposta.
app.use(errors());

/**
 * Middleware para exibição dos erros do tipo AppError
 */
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // -- Erro inesperado do sistema.
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error!',
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
