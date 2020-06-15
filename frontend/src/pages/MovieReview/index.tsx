import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  Component,
} from 'react';
import {
  FiArrowLeft,
  FiSearch,
  FiChevronRight,
  FiArrowUp,
  FiArrowDown,
} from 'react-icons/fi';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import * as Yup from 'yup';
import localIpUrl from 'local-ip-url';
import enUS from 'date-fns/locale/en-US';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import { FormHandles } from '@unform/core';
import 'react-day-picker/lib/style.css';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Form } from '@unform/web';
import axios from 'axios';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';
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
import getValidationErrors from '../../utils/getValidationErrors';
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
  const [movie, setMovie] = useState<InfoMovie>({} as InfoMovie);
  const [movieReview, setMovieReview] = useState<Review>({} as Review);
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

      const findReviewAlreadySaved = async (): Promise<void> => {
        try {
          const { data } = await api.get(`/reviews/${params.movieID}/me`);

          if (data) {
            setMovieReview(data);
          }
        } catch (err) {
          console.log(err);
        }
      };

      findReviewAlreadySaved();

      const createANewReview = async (): Promise<void> => {
        // -- Criando registro de crítica...
        const { data } = await api.post('/reviews', {
          movie_id: params.movieID,
        });

        if (data) {
          setMovieReview(data);
        }
      };

      // eslint-disable-next-line no-underscore-dangle
      if (movieReview._id) {
        return;
      }

      createANewReview();

      if (!movieReview) {
        addToast({
          type: 'error',
          title: 'Review failed!',
          description:
            'Error ocurrency on trying to find or create a new review. Try again!',
        });
      }
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
        {loading && <p>Loading...</p>}

        {!loading && movie && (
          <MovieInfo>
            <header>
              <img src={movie.Poster} alt={movie.Title} />
              <div>
                <h1>{movie.Title}</h1>
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
          <button type="button" onClick={() => {}}>
            <FaHeartBroken />
          </button>
        </div>
      </ReviewActions>
    </Container>
  );
};

export default MovieReview;
