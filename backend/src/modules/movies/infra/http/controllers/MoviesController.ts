import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListMoviesService from '@modules/movies/services/ListMoviesService';

export default class Controller {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id, name } = request.query;

    const listMoviesService = container.resolve(ListMoviesService);

    const list = await listMoviesService.execute({
      id: id ? String(id) : undefined,
      name: name ? String(name) : undefined,
    });

    return response.json(list);
  }
}
