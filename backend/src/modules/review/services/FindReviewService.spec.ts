/**
 * Teste unitário
 */
import 'reflect-metadata';

import AppError from '@shared/erros/AppError';
import FakeReviewRepository from '../repositories/fakes/FakeReviewRepository';
import FindReviewService from './FindReviewService';

let fakeReviewRepository: FakeReviewRepository;
let findReview: FindReviewService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeReviewRepository = new FakeReviewRepository();
    findReview = new FindReviewService(fakeReviewRepository);
  });

  it('should be able to find a review on a spesific movie id', async () => {
    await fakeReviewRepository.create({
      user: '127.0.0.1',
      movie_id: 'tt0120630',
    });

    const review = await findReview.execute({
      movie_id: 'tt0120630',
    });

    expect(review).toHaveProperty('movie_id');
  });

  it('should not be able to find review with a none existing movie id', async () => {
    await expect(
      findReview.execute({
        movie_id: 'tt0120630',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
