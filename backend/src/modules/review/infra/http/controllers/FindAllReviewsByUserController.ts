import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllReviewsByUserService from '@modules/review/services/FindAllReviewsByUserService';

export default class LikeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user } = request.params;

    const findAllReviews = container.resolve(FindAllReviewsByUserService);

    const reviews = await findAllReviews.execute({
      user,
    });

    return response.json(reviews);
  }
}
