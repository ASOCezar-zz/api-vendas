import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

type IRequest = {
  email: string;
};

export default class QueryUserByEmailService {
  public async execute({ email }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findByEmail(email);

    if (userExists) {
      return userExists;
    } else {
      throw new AppError('We did not found an user with this id');
    }
  }
}
