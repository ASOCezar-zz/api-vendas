import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcryptjs';

type ResetUserPasswordServiceType = {
  token: string;
  password: string;
};

export default class ResetUserPasswordService {
  public async execute({
    token,
    password,
  }: ResetUserPasswordServiceType): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token not valid or expired');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('This user does not exist');
    }

    const compareDate = addHours(userToken.created_at, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = await hash(password, 8);

    await usersRepository.save(user);
  }
}
