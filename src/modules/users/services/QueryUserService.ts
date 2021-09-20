import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

type IRequest = {
  id: string;
  name: string;
  email: string;
};

export default class QueryUserService {
  public async execute({
    id,
    name,
    email,
  }: IRequest): Promise<User | User[] | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);

    const haveId = !!id;
    const haveName = !!name;
    const haveEmail = !!email;
    let users: User | User[] | undefined = undefined;

    if (haveId) {
      users = await usersRepository.findById(id);
      if (users !== undefined) {
        return users;
      } else {
        throw new AppError('We did not found an user with this id');
      }
    }

    if (haveName) {
      const users = await usersRepository.findByName(name);
      if (users !== undefined) {
        return users;
      } else {
        throw new AppError('We did not found an user with this id');
      }
    }

    if (haveEmail) {
      const users = await usersRepository.findByEmail(email);
      if (users !== undefined) {
        return users;
      } else {
        throw new AppError('We did not found an user with this id');
      }
    }
  }
}
