/**
 * Teste unitário
 */
import 'reflect-metadata';

import AppError from '@shared/erros/AppError';
import FakeReviewRepository from '../repositories/fakes/FakeReviewRepository';
import CreactReviewService from './CreactReviewService';

let fakeReviewRepository: FakeReviewRepository;
let creactReview: CreactReviewService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeReviewRepository = new FakeReviewRepository();
    creactReview = new CreactReviewService(fakeReviewRepository);
  });

  it('should be able to create a new review', async () => {
    const review = await creactReview.execute({
      user: '127.0.0.1',
      movie_id: 'tt0120630',
    });

    expect(review).toHaveProperty('movie_id');
  });

  it('should not be able to create a review with an existing movie id', async () => {
    await creactReview.execute({
      user: '127.0.0.1',
      movie_id: 'tt0120630',
    });

    await expect(
      creactReview.execute({
        user: '127.0.0.1',
        movie_id: 'tt0120630',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
