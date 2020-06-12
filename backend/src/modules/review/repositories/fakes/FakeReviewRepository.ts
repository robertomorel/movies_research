import IReviewsRepository from '@modules/review/repositories/IReviewsRepository';
import ICreateReviewDTO from '@modules/review/dtos/ICreateReviewDTO';
import IReviewDTO from '@modules/review/infra/mongo/dtos/IReviewDTO';
import Movie from '@shared/infra/mongoose/models/Movie';
import ip from 'ip';
import AppError from '@shared/erros/AppError';

class FakeReviewRepository implements IReviewsRepository {
  public async create(data: ICreateReviewDTO): Promise<IReviewDTO> {
    const { movie_id } = data;
    const ipAddress = ip.address();
    const review = await Movie.create({
      user: ipAddress,
      movie_id,
      like: false,
      dislike: false,
    });
    return review;
  }

  public async like(movie_id: string): Promise<IReviewDTO> {
    const review = await this.findByMovieId(movie_id);
    review.like = !review.like;

    if (review.like) {
      review.dislike = false;
    }

    await review.save();

    return review;
  }

  public async dislike(movie_id: string): Promise<IReviewDTO> {
    const review = await this.findByMovieId(movie_id);
    review.dislike = !review.dislike;

    if (review.like) {
      review.dislike = false;
    }

    await review.save();

    return review;
  }

  public async findByUser(user: string): Promise<IReviewDTO[] | null> {
    const reviews = await Movie.find({
      where: user,
    });
    return reviews;
  }

  public async findByMovieId(movie_id: string): Promise<IReviewDTO> {
    const review = await Movie.findOne({
      where: movie_id,
    });

    if (!review) {
      throw new AppError(`No review found by id ${movie_id}`);
    }
    return review;
  }
}

export default FakeReviewRepository;
