import { inject, injectable } from 'tsyringe';
import IReviewDTO from '@modules/review/infra/mongo/dtos/IReviewDTO';

import AppError from '@shared/erros/AppError';
import IReviewsRepository from '@modules/review/repositories/IReviewsRepository';

interface IRequest {
  movie_id: string;
}

@injectable()
class CreateReviewService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository,
  ) {}

  public async execute({ movie_id }: IRequest): Promise<IReviewDTO> {
    let review = await this.reviewsRepository.findByMovieId(movie_id);

    if (review) {
      console.log('_________ AQUI ___________');
      throw new AppError(
        'It´s not possible to create a new review for an existing movie id!',
      );
    }

    review = await this.reviewsRepository.create({
      movie_id,
    });

    return review;
  }
}

export default CreateReviewService;
