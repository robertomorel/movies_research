/**
 * Teste unitário
 */
import 'reflect-metadata';

import AppError from '@shared/erros/AppError';
import FakeReviewRepository from '../repositories/fakes/FakeReviewRepository';
import FindAllReviewsByUserService from './FindAllReviewsByUserService';

let fakeReviewRepository: FakeReviewRepository;
let findAllReviewsByUser: FindAllReviewsByUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeReviewRepository = new FakeReviewRepository();
    findAllReviewsByUser = new FindAllReviewsByUserService(
      fakeReviewRepository,
    );
  });

  it('should be able to find all reviews on a spesific user', async () => {
    const review_1 = await fakeReviewRepository.create({
      user: '127.0.0.1',
      movie_id: 'tt0120630',
    });

    const review_2 = await fakeReviewRepository.create({
      user: '127.0.0.1',
      movie_id: 'tt0120631',
    });

    const reviews = await findAllReviewsByUser.execute({
      user: '127.0.0.1',
    });

    expect(reviews).toEqual([review_1, review_2]);
  });

  it('should not be able to find reviews with a none existing user', async () => {
    const reviews = await findAllReviewsByUser.execute({
      user: '127.0.0.1',
    });

    expect(reviews).toEqual([]);
  });
});
