import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';

type SendForgotPasswordEmailType = {
  email: string;
};

export default class SendForgotPasswordEmailService {
  public async execute({ email }: SendForgotPasswordEmailType): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('This email is not valid');
    }

    const token = await userTokenRepository.generate(user.id);

    console.log(token);
  }
}
