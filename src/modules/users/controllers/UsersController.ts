import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUsersService';
import QueryUserByIdService from '../services/QueryUserByIdService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUsersService();

    const users = await listUsers.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    return response.json(user);
  }

  public async queryById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const queryUser = new QueryUserByIdService();

    if (typeof id !== 'string') {
      throw new AppError(' Id not found ');
    }

    const user = await queryUser.execute({ id });

    return response.json(user);
  }
}
