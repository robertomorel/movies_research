import IReviewDTO from '@modules/review/infra/mongo/dtos/IReviewDTO';
import IReviewsRepository from '@modules/review/repositories/IReviewsRepository';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/erros/AppError';

interface IRequest {
  user: string;
  movie_id: string;
  like?: boolean;
  dislike?: boolean;
}

@injectable()
class CreateReviewService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository,
  ) {}

  public async execute(data: IRequest): Promise<IReviewDTO> {
    const { user, movie_id, like, dislike } = data;
    let review = await this.reviewsRepository.findByMovieId(movie_id);

    if (review) {
      throw new AppError(
        'It´s not possible to create a new review for an existing movie id!',
      );
    }

    review = await this.reviewsRepository.create({
      user,
      movie_id,
      like,
      dislike,
    });

    return review;
  }
}

export default CreateReviewService;
