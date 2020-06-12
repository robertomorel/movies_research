import mongoose from 'mongoose';
import IReviewDTO from '@modules/review/infra/mongo/dtos/IReviewDTO';

const MovieSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      trim: true,
      required: true,
    },
    movie_id: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    like: {
      type: Boolean,
      required: false,
    },
    dislike: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

// export default mongoose.model<IUser>('User', UserSchema);
export default mongoose.model<IReviewDTO>('Movie', MovieSchema);
