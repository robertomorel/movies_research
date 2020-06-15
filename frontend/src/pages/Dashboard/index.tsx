import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  FiSearch,
  FiChevronRight,
  FiArrowUp,
  FiArrowDown,
} from 'react-icons/fi';
import * as Yup from 'yup';
import enUS from 'date-fns/locale/en-US';
import { format } from 'date-fns';
import { FormHandles } from '@unform/core';
import 'react-day-picker/lib/style.css';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import axios from 'axios';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Search,
  Content,
  Section,
  Movie,
} from './styles';
import imgProfile from '../../assets/logo.png';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface SearchFormData {
  search: string;
}

interface Review {
  _id: string;
  user: string;
  movie_id: string;
  like: boolean;
  dislike: boolean;
}

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface MovieReviewedByUser extends Movie {
  like: boolean;
  dislike: boolean;
}

const localStoragePrefix = 'app_movie_flix#';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [newMovie, setNewMovie] = useState<string>(() => {
    return localStorage.getItem(localStoragePrefix.concat('search')) || '';
  });
  const [isIncreasing, setIsIncreasing] = useState(() => {
    const order = localStorage.getItem(localStoragePrefix.concat('order'));
    return order && Boolean(order);
  });
  const [user, setUser] = useState('');
  const [reviewedMovies, setReviewedMovies] = useState<Review[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [userLikedReviews, setUserLikedReviews] = useState<
    MovieReviewedByUser[]
  >([]);
  const [userDislikedReviews, setUserDislikedReviews] = useState<
    MovieReviewedByUser[]
  >([]);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  useEffect(() => {
    const userStoraged = localStorage.getItem(
      localStoragePrefix.concat('user'),
    );
    if (userStoraged) {
      setUser(userStoraged);
      return;
    }

    axios
      .get('https://api.ipify.org/?format=jsonp?callback=?')
      .then(response => {
        setUser(response.data);
        localStorage.setItem(localStoragePrefix.concat('user'), response.data);
      });
  }, []);

  useEffect(() => {
    if (user) {
      api.get(`/reviews/${user}/all`).then(response => {
        setReviewedMovies(response.data);
      });
    }
  }, [user]);

  useEffect(() => {
    if (!movies || movies.length === 0) {
      return;
    }

    function reviewFilter(like: boolean): MovieReviewedByUser[] {
      const likedMoviesReview = movies
        .filter(
          movie =>
            reviewedMovies
              .filter(reviewedMovie =>
                like ? reviewedMovie.like : reviewedMovie.dislike,
              )
              .map(reviewedMovie => reviewedMovie.movie_id)
              .indexOf(movie.imdbID) !== -1,
        )
        .map<MovieReviewedByUser>(likedMovie => {
          return Object.assign(likedMovie, {
            like: true,
            dislike: false,
          });
        });

      return likedMoviesReview;
    }
    setUserLikedReviews(reviewFilter(true));
    setUserDislikedReviews(reviewFilter(false));
  }, [movies, reviewedMovies]);

  const handleMovieSearch = useCallback(
    async (data: SearchFormData) => {
      try {
        setLoading(true);
        localStorage.setItem(localStoragePrefix.concat('search'), data.search);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          search: Yup.string().required('Movie name required!'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        api
          .get('/movies', {
            params: {
              name: data.search,
            },
          })
          .then(response => {
            setMovies(response.data);
          });

        addToast({
          type: 'success',
          title: 'Search successful!',
          description: 'Enjoy the movies!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Search failed!',
          description:
            'There was an error while searching for movies. Try again!',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  const handleOrder = useCallback(async () => {
    if (loading) {
      return;
    }

    if (isIncreasing) {
      movies.length > 0 &&
        setMovies(movies.sort((a, b) => (a.Year > b.Year ? 1 : -1)));
      userLikedReviews.length > 0 &&
        setUserLikedReviews(
          userLikedReviews.sort((a, b) => (a.Year > b.Year ? 1 : -1)),
        );
      userDislikedReviews.length > 0 &&
        setUserDislikedReviews(
          userDislikedReviews.sort((a, b) => (a.Year > b.Year ? 1 : -1)),
        );
    } else {
      movies.length > 0 &&
        setMovies(movies.sort((a, b) => (a.Year < b.Year ? 1 : -1)));
      userLikedReviews.length > 0 &&
        setUserLikedReviews(
          userLikedReviews.sort((a, b) => (a.Year < b.Year ? 1 : -1)),
        );
      userDislikedReviews.length > 0 &&
        setUserDislikedReviews(
          userDislikedReviews.sort((a, b) => (a.Year < b.Year ? 1 : -1)),
        );
    }

    setIsIncreasing(!isIncreasing);

    localStorage.setItem(
      localStoragePrefix.concat('order'),
      String(isIncreasing),
    );
  }, [loading, isIncreasing, movies, userDislikedReviews, userLikedReviews]);

  const selectedDateAsText = useMemo(() => {
    return format(new Date(), "MMMM dd'º'", {
      locale: enUS,
    });
  }, []);

  const selectedWeekDay = useMemo(() => {
    return format(new Date(), 'cccc', {
      locale: enUS,
    });
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <img src={imgProfile} alt="Profile" />

            <div>
              <span>Wellcome,</span>
              <strong>{user}</strong>
            </div>
          </Profile>
        </HeaderContent>
      </Header>

      <Content>
        <Search>
          <h1>Movie Research</h1>
          <p>
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          <Form ref={formRef} onSubmit={handleMovieSearch}>
            <Input
              name="search"
              value={newMovie}
              onChange={e => setNewMovie(e.target.value)}
              icon={FiSearch}
              placeholder="Enter the movie name for research"
            />
            <Button loading={loading} type="submit">
              Search
            </Button>
          </Form>

          <button type="button" onClick={handleOrder}>
            {isIncreasing ? <FiArrowDown /> : <FiArrowUp />}
          </button>

          <Section>
            <strong>All</strong>

            {movies.length === 0 && <p>No movie found.</p>}

            {movies.length !== 0 &&
              movies.map(movie => (
                <Movie key={movie.imdbID}>
                  <Link key="teste" to={`/movieReview/${movie.imdbID}`}>
                    <div>
                      <img src={movie.Poster} alt={movie.Title} />

                      <div>
                        <strong>{movie.Title}</strong>
                        <p>{`Year: ${movie.Year}`}</p>
                        <p>{`Type: ${movie.Type}`}</p>
                      </div>

                      <FiChevronRight size={20} />
                    </div>
                  </Link>
                </Movie>
              ))}
          </Section>

          <Section>
            <strong style={{ color: '#689f69' }}>Favorites</strong>

            {userLikedReviews.length === 0 && <p>No liked movies found.</p>}

            {userLikedReviews.length !== 0 &&
              userLikedReviews.map(movie => (
                <Movie key={movie.imdbID}>
                  <Link key="teste" to="/">
                    <div>
                      <img src={movie.Poster} alt={movie.Title} />

                      <div>
                        <strong>{movie.Title}</strong>
                        <p>{`Year: ${movie.Year}`}</p>
                        <p>{`Type: ${movie.Type}`}</p>
                      </div>

                      <FiChevronRight size={20} />
                    </div>
                  </Link>
                </Movie>
              ))}
          </Section>

          <Section>
            <strong style={{ color: '#8e2828' }}>Marked as ~dislike~</strong>

            {userDislikedReviews.length === 0 && <p>No liked movies found.</p>}

            {userDislikedReviews.length !== 0 &&
              userDislikedReviews.map(movie => (
                <Movie key={movie.imdbID}>
                  <Link key="teste" to="/">
                    <div>
                      <img src={movie.Poster} alt={movie.Title} />

                      <div>
                        <strong>{movie.Title}</strong>
                        <p>{`Year: ${movie.Year}`}</p>
                        <p>{`Type: ${movie.Type}`}</p>
                      </div>

                      <FiChevronRight size={20} />
                    </div>
                  </Link>
                </Movie>
              ))}
          </Section>
        </Search>
      </Content>
    </Container>
  );
};

export default Dashboard;
