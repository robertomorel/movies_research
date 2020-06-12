import { inject, injectable } from 'tsyringe';
import { SearchResult } from 'js-omdb-api';

import AppError from '@shared/erros/AppError';

import IMoviesRepository from '../repositories/IMoviesRepository';

interface IRequest {
  id?: string;
  name?: string;
}

@injectable()
class ListMoviesService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {}

  public async execute({
    id,
    name,
  }: IRequest): Promise<SearchResult | SearchResult[] | undefined> {
    if (!id && !name) {
      throw new AppError('You can´t find a movie without a id or name!');
    }

    let movieList;

    if (id) {
      movieList = await this.moviesRepository.findById(id);
    } else if (name) {
      movieList = await this.moviesRepository.findByName(name);
    }

    return movieList;
  }
}

export default ListMoviesService;
