/* eslint-disable no-nested-ternary */
import React, { useState, useCallback, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import 'react-day-picker/lib/style.css';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import {
  Container,
  Content,
  Header,
  HeaderContent,
  Profile,
  MovieInfo,
  ReviewActions,
} from './styles';
import imgProfile from '../../assets/logo.png';
import api from '../../services/api';

interface MovieParams {
  movieID: string;
}

interface Review {
  _id: string;
  user: string;
  movie_id: string;
  like: boolean;
  dislike: boolean;
}

interface InfoMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Director: string;
  Actors: string;
  Plot: string;
  Language: string;
  Awards: string;
  Poster: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
}

const MovieReview: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<InfoMovie | null>(null);
  const [movieReview, setMovieReview] = useState<Review | null>(null);
  const { params } = useRouteMatch<MovieParams>();
  const history = useHistory();

  const { addToast } = useToast();

  useEffect(() => {
    try {
      setLoading(true);

      const findMovieDetail = async (): Promise<void> => {
        // -- Buscando informações detalhadas do filme...
        const response = await api.get('/movies', {
          params: {
            id: params.movieID,
          },
        });

        setMovie(response.data);
      };

      findMovieDetail();

      api
        .get(`/reviews/${params.movieID}/me`)
        .then(response => {
          setMovieReview(response.data);
        })
        .catch(() => {
          api
            .post('/reviews', {
              movie_id: params.movieID,
            })
            .then(resp => {
              setMovieReview(resp.data);
            })
            .catch(err => {
              console.log(err);
              addToast({
                type: 'error',
                title: 'Review failed!',
                description:
                  'Error ocurrency on trying to find or create a new review. Try again!',
              });
            });
        });
    } finally {
      setLoading(false);
    }
  }, [params.movieID, addToast]);

  const handleLike = useCallback(async () => {
    try {
      setLoading(true);

      const setLike = async (): Promise<void> => {
        const { data } = await api.put('/reviews/like', {
          movie_id: params.movieID,
        });

        if (data) {
          setMovieReview(data);
        }
      };

      setLike();

      addToast({
        type: 'success',
        title: 'Like successfull!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Like failed!',
        description: 'Error ocurrency on liking a movie. Try again!',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, params.movieID]);

  const handleDislike = useCallback(async () => {
    try {
      setLoading(true);

      const setLike = async (): Promise<void> => {
        const { data } = await api.put('/reviews/dislike', {
          movie_id: params.movieID,
        });

        if (data) {
          setMovieReview(data);
        }
      };

      setLike();

      addToast({
        type: 'success',
        title: 'Dislike successfull!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Dislike failed!',
        description: 'Error ocurrency on disliking a movie. Try again!',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, params.movieID]);

  const handleBack = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <img src={imgProfile} alt="Profile" />

            <div>
              <strong>Movie Review</strong>
            </div>
          </Profile>

          <button type="button" onClick={handleBack}>
            <FiArrowLeft />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        {(loading || !movie || !movieReview) && <p>Loading...</p>}

        {!loading && movie && movieReview && (
          <MovieInfo
            like={movieReview && movieReview.like}
            dislike={movieReview && movieReview.dislike}
          >
            <header>
              <img src={movie.Poster} alt={movie.Title} />
              <div>
                <h1>{movie.Title}</h1>
                <h4>
                  (
                  {!movieReview
                    ? 'No reviewed'
                    : movieReview.like
                    ? 'Like'
                    : movieReview.dislike
                    ? 'Dislike'
                    : 'No reviewed'}
                  )
                </h4>

                <p>
                  <span>{movie.Actors}</span>
                </p>

                <div>
                  <p>Plot</p>
                  <p>{movie.Plot}</p>
                </div>

                <div>
                  <p>Director</p>
                  <p>{movie.Director}</p>
                </div>

                <div>
                  <p>Language</p>
                  <p>{movie.Language}</p>
                </div>

                <div>
                  <p>Awards</p>
                  <p>{movie.Awards}</p>
                </div>
              </div>
            </header>
            <ul>
              <li>
                <strong>{movie.Metascore}</strong>
                <span>Metascore</span>
              </li>
              <li>
                <strong>{movie.imdbRating}</strong>
                <span>IMDB Rating</span>
              </li>
              <li>
                <strong>{movie.imdbVotes}</strong>
                <span>IMDB Votes</span>
              </li>
            </ul>
          </MovieInfo>
        )}
      </Content>
      <ReviewActions>
        <div>
          <button type="button" onClick={handleLike}>
            <FaHeart />
          </button>
          <div />
          <button type="button" onClick={handleDislike}>
            <FaHeartBroken />
          </button>
        </div>
      </ReviewActions>
    </Container>
  );
};

export default MovieReview;
