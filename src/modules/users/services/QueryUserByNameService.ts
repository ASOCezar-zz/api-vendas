import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

type IRequest = {
  name: string;
};

export default class QueryUserByNameService {
  public async execute({ name }: IRequest): Promise<User | User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findByName(name);

    if (userExists) {
      return userExists;
    } else {
      throw new AppError('We did not found an user with this id');
    }
  }
}
