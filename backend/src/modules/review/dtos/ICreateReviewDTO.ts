export default interface ICreateReviewDTO {
  user: string;
  movie_id: string;
  like?: boolean;
  dislike?: boolean;
}
