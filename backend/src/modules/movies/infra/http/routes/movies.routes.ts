import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import MoviesController from '@modules/movies/infra/http/controllers/MoviesController';

const moviesRouter = Router();

const moviesController = new MoviesController();

moviesRouter.get(
  '/',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string(),
      name: Joi.string(),
    },
  }),
  moviesController.index,
);

export default moviesRouter;
