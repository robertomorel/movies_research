import IMoviesRepository from '@modules/movies/repositories/IMoviesRepository';
import { SearchResult } from 'js-omdb-api';

class FakeMoviesRepository implements IMoviesRepository {
  public async findById(id: string): Promise<SearchResult> {
    // TODO: desenvolver método caso haja tempo de criar TU
    return {} as SearchResult;
  }

  public async findByName(name: string): Promise<SearchResult[]> {
    // TODO: desenvolver método caso haja tempo de criar TU
    return [] as SearchResult[];
  }
}

export default FakeMoviesRepository;
