import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

type IRequest = {
  id: string;
};

export default class QueryUserByIdService {
  public async execute({ id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findById(id);

    if (!userExists) {
      throw new AppError('We did not found an user with this id');
    }

    return userExists;
  }
}
