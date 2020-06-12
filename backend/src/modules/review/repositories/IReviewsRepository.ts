import ICreateReviewDTO from '@modules/review/dtos/ICreateReviewDTO';
import IReviewDTO from '@modules/review/infra/mongo/dtos/IReviewDTO';

export default interface IReviewsRepository {
  create(data: ICreateReviewDTO): Promise<IReviewDTO>;
  like(movie_id: string): Promise<IReviewDTO>;
  dislike(movie_id: string): Promise<IReviewDTO>;
  findByUser(user: string): Promise<IReviewDTO[] | null>;
  findByMovieId(movie_id: string): Promise<IReviewDTO | null>;
}
