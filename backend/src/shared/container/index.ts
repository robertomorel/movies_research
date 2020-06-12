import { container } from 'tsyringe';

import IMoviesRepository from '@modules/movies/repositories/IMoviesRepository';
import MoviesRepository from '@modules/movies/infra/axios/repositories/MoviesRepository';

import IReviewsRepository from '@modules/review/repositories/IReviewsRepository';
import ReviewsRepository from '@modules/review/infra/mongo/repositories/ReviewsRepository';

container.registerSingleton<IMoviesRepository>(
  'MoviesRepository',
  MoviesRepository,
);

container.registerSingleton<IReviewsRepository>(
  'ReviewsRepository',
  ReviewsRepository,
);
