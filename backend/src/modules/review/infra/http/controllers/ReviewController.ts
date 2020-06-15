import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ip from 'ip';

import CreactReviewService from '@modules/review/services/CreactReviewService';
import axios from 'axios';

export default class ReviewsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { movie_id, like, dislike } = request.body;

    const createReview = container.resolve(CreactReviewService);

    let { data: user } = await axios.get(
      'https://api.ipify.org/?format=jsonp?callback=?',
    );

    if (!user) {
      user = ip.address();
    }

    const review = await createReview.execute({
      user,
      movie_id,
      like,
      dislike,
    });

    return response.json(review);
  }
}
