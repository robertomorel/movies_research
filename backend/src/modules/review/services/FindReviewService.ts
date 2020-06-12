import { inject, injectable } from 'tsyringe';
import IReviewDTO from '@modules/review/infra/mongo/dtos/IReviewDTO';

import AppError from '@shared/erros/AppError';
import IReviewsRepository from '@modules/review/repositories/IReviewsRepository';

interface IRequest {
  movie_id: string;
}

@injectable()
class FindReviewService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository,
  ) {}

  public async execute({ movie_id }: IRequest): Promise<IReviewDTO> {
    const review = await this.reviewsRepository.findByMovieId(movie_id);

    if (!review) {
      throw new AppError('No review register found!');
    }

    return review;
  }
}

export default FindReviewService;
