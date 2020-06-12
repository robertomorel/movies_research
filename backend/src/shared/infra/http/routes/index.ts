import { Router } from 'express';
import moviesRouter from '@modules/movies/infra/http/routes/movies.routes';
import reviewsRouter from '@modules/review/infra/http/routes/reviews.routes';

const routes = Router();

routes.use('/movies', moviesRouter);
routes.use('/reviews', reviewsRouter);

export default routes;
