import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateReviewService from '@modules/review/services/UpdateReviewService';

export default class LikeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { movie_id } = request.body;

    const likeReview = container.resolve(UpdateReviewService);

    const review = await likeReview.execute({
      movie_id,
      like: true,
    });

    return response.json(review);
  }
}
