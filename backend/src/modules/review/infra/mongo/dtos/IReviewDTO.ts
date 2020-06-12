import { Document } from 'mongoose';

export default interface IReviewDTO extends Document {
  user: string;
  movie_id: string;
  like?: boolean;
  dislike?: boolean;
}

/*
export default interface IReviewDTO {
  [key: string]: Document;
}
*/
