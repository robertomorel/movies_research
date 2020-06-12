import { SearchResult } from 'js-omdb-api';
import axios from 'axios';
import IMoviesRepository from '@modules/movies/repositories/IMoviesRepository';
import AppError from '@shared/erros/AppError';

class MoviesRepository implements IMoviesRepository {
  public async findById(id: string): Promise<SearchResult> {
    if (!id) {
      throw new AppError('You can´t find a movie without a id!');
    }

    const endpoint = `${process.env.API_OMDB_URL}/?i=${id}&apikey=${process.env.API_OMDB_SECRET_KEY}&plot=full`;

    const { data } = await axios.get(endpoint);

    return data;
  }

  public async findByName(name: string): Promise<SearchResult[]> {
    if (!name) {
      throw new AppError('You can´t find a movie without a name!');
    }

    const fomattedName = name.replace(' ', '+').trim();

    const endpoint = `${process.env.API_OMDB_URL}/?s=${fomattedName}&apikey=${process.env.API_OMDB_SECRET_KEY}&plot=full`;

    const { data } = await axios.get(endpoint);
    const { Search } = data;

    return Search;
  }
}

export default MoviesRepository;
