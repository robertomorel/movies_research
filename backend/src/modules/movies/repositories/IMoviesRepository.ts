import { SearchResult } from 'js-omdb-api';

export default interface IMoviesRepository {
  findById(id: string): Promise<SearchResult>;
  findByName(name: string): Promise<SearchResult[]>;
}
