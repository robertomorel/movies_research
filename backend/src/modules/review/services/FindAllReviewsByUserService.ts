import { inject, injectable } from 'tsyringe';
import IReviewDTO from '@modules/review/infra/mongo/dtos/IReviewDTO';

import AppError from '@shared/erros/AppError';
import IReviewsRepository from '@modules/review/repositories/IReviewsRepository';

interface IRequest {
  user: string;
}

@injectable()
class FindAllReviewsByUserService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository,
  ) {}

  public async execute({ user }: IRequest): Promise<IReviewDTO[]> {
    const reviews = await this.reviewsRepository.findByUser(user);

    if (!reviews) {
      throw new AppError(`No reviews register found for user ${user}!`);
    }

    return reviews;
  }
}

export default FindAllReviewsByUserService;
