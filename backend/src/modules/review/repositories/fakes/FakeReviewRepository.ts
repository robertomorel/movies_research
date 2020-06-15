import IReviewsRepository from '@modules/review/repositories/IReviewsRepository';
import ICreateReviewDTO from '@modules/review/dtos/ICreateReviewDTO';
import IReviewDTO from '@modules/review/infra/mongo/dtos/IReviewDTO';
import AppError from '@shared/erros/AppError';

class FakeReviewRepository implements IReviewsRepository {
  private reviews: IReviewDTO[] = [];

  public async create(data: ICreateReviewDTO): Promise<IReviewDTO> {
    const newReview = {} as IReviewDTO;
    console.log('------------------------');
    const { user, movie_id, like, dislike } = data;

    Object.assign(newReview, { user, movie_id, like, dislike });

    this.reviews.push(newReview);

    return newReview;
  }

  public async like(movie_id: string): Promise<IReviewDTO> {
    const index = this.reviews.findIndex(
      review => review.movie_id === movie_id,
    );
    this.reviews[index].like = true;
    this.reviews[index].dislike = false;

    return this.reviews[index];
  }

  public async dislike(movie_id: string): Promise<IReviewDTO> {
    const index = this.reviews.findIndex(
      review => review.movie_id === movie_id,
    );
    this.reviews[index].like = false;
    this.reviews[index].dislike = true;

    return this.reviews[index];
  }

  public async findByUser(user: string): Promise<IReviewDTO[] | null> {
    const findReview = this.reviews.filter(review => review.user === user);

    return findReview;
  }

  public async findByMovieId(movie_id: string): Promise<IReviewDTO | null> {
    const findReview = this.reviews.find(
      review => review.movie_id === movie_id,
    );

    return findReview || null;
  }
}

export default FakeReviewRepository;
