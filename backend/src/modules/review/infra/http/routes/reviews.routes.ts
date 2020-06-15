import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ReviewController from '@modules/review/infra/http/controllers/ReviewController';
import LikeController from '@modules/review/infra/http/controllers/LikeController';
import DislikeController from '@modules/review/infra/http/controllers/DislikeController';
import FindReviewController from '@modules/review/infra/http/controllers/FindReviewController';
import FindAllReviewsByUserController from '@modules/review/infra/http/controllers/FindAllReviewsByUserController';

const reviewsRouter = Router();

const reviewController = new ReviewController();
const likeController = new LikeController();
const dislikeController = new DislikeController();
const findReviewController = new FindReviewController();
const findAllReviewsByUserController = new FindAllReviewsByUserController();

reviewsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      movie_id: Joi.string().required(),
      like: Joi.boolean(),
      dislike: Joi.boolean(),
    },
  }),
  reviewController.create,
);

reviewsRouter.put(
  '/like',
  celebrate({
    [Segments.BODY]: {
      movie_id: Joi.string().required(),
    },
  }),
  likeController.create,
);

reviewsRouter.put(
  '/dislike',
  celebrate({
    [Segments.BODY]: {
      movie_id: Joi.string().required(),
    },
  }),
  dislikeController.create,
);

reviewsRouter.get(
  '/:movie_id/me',
  celebrate({
    [Segments.PARAMS]: {
      movie_id: Joi.string().required(),
    },
  }),
  findReviewController.create,
);

reviewsRouter.get(
  '/:user/all',
  celebrate({
    [Segments.PARAMS]: {
      user: Joi.string().required(),
    },
  }),
  findAllReviewsByUserController.create,
);

export default reviewsRouter;
