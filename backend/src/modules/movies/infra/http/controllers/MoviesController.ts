import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListMoviesService from '@modules/movies/services/ListMoviesService';

export default class Controller {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id, name } = request.body;

    const listMoviesService = container.resolve(ListMoviesService);

    const list = await listMoviesService.execute({
      id,
      name,
    });

    return response.json(list);
  }
}
