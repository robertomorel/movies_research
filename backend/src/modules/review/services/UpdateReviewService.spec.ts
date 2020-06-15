/**
 * Teste unitário
 */
import 'reflect-metadata';

import AppError from '@shared/erros/AppError';
import FakeReviewRepository from '../repositories/fakes/FakeReviewRepository';
import UpdateReviewService from './UpdateReviewService';

let fakeReviewRepository: FakeReviewRepository;
let updateReview: UpdateReviewService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeReviewRepository = new FakeReviewRepository();
    updateReview = new UpdateReviewService(fakeReviewRepository);
  });

  it('should be able to like an existing review', async () => {
    await fakeReviewRepository.create({
      user: '127.0.0.1',
      movie_id: 'tt0120630',
    });

    const review = await updateReview.execute({
      movie_id: 'tt0120630',
      like: true,
    });

    expect(review).toHaveProperty('movie_id');
  });

  it('should be able to dislike an existing review', async () => {
    await fakeReviewRepository.create({
      user: '127.0.0.1',
      movie_id: 'tt0120630',
    });

    const review = await updateReview.execute({
      movie_id: 'tt0120630',
      like: false,
    });

    expect(review).toHaveProperty('movie_id');
  });

  it('should not be able to update a review with a none existing movie id', async () => {
    await expect(
      updateReview.execute({
        movie_id: 'tt0120630',
        like: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
