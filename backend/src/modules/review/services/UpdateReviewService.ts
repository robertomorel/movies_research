import { inject, injectable } from 'tsyringe';
import IReviewDTO from '@modules/review/infra/mongo/dtos/IReviewDTO';

import AppError from '@shared/erros/AppError';
import IReviewsRepository from '@modules/review/repositories/IReviewsRepository';

interface IRequest {
  movie_id: string;
  like: boolean;
}

@injectable()
class UpdateReviewService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository,
  ) {}

  public async execute({ movie_id, like }: IRequest): Promise<IReviewDTO> {
    let review = await this.reviewsRepository.findByMovieId(movie_id);

    if (!review) {
      throw new AppError(`No review found with movie id ${movie_id}!`);
    }

    if (like) {
      review = await this.reviewsRepository.like(movie_id);
    } else {
      review = await this.reviewsRepository.dislike(movie_id);
    }

    return review;
  }
}

export default UpdateReviewService;
