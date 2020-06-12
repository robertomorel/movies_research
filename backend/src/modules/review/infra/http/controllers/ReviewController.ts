import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreactReviewService from '@modules/review/services/CreactReviewService';

export default class ReviewsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { movie_id } = request.body;

    const createReview = container.resolve(CreactReviewService);

    const review = await createReview.execute({
      movie_id,
    });

    return response.json(review);
  }
}
