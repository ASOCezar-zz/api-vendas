import EtherealMail from '@config/mail/EtherealMail';
import AppError from '@shared/errors/AppError';
import path from 'path';
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

    const { token } = await userTokenRepository.generate(user.id);

    const forgotPasswordEmail = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password_email.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: email,
      },
      subject: '[API Vendas] Change your password ',
      templateData: {
        file: forgotPasswordEmail,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}
