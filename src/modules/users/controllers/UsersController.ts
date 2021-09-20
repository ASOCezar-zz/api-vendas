import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUsersService';
import QueryUserService from '../services/QueryUserService';

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

  public async query(request: Request, response: Response): Promise<Response> {
    const { name, email, id } = request.body;

    const queryUser = new QueryUserService();

    const user = await queryUser.execute({ name, email, id });

    return response.json(user);
  }
}
