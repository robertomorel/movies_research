import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindReviewService from '@modules/review/services/FindReviewService';

export default class LikeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { movie_id } = request.params;

    const reviewService = container.resolve(FindReviewService);

    const review = await reviewService.execute({
      movie_id,
    });

    return response.json(review);
  }
}
