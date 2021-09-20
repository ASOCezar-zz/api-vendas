import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUsersService';
import QueryUserByEmailService from '../services/QueryUserByEmailService';
import QueryUserByIdService from '../services/QueryUserByIdService';
import QueryUserByNameService from '../services/QueryUserByNameService';

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

    const user = await queryUser.execute({ id });

    return response.json(user);
  }

  public async queryByName(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name } = request.body;

    const queryUser = new QueryUserByNameService();

    const user = await queryUser.execute({ name });

    return response.json(user);
  }

  public async queryByEmail(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email } = request.body;

    const queryUser = new QueryUserByEmailService();

    const user = await queryUser.execute({ email });

    return response.json(user);
  }
}
