import EtherealMail from '@config/mail/EtherealMail';
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

    const { token } = await userTokenRepository.generate(user.id);

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: email,
      },
      subject: '[API Vendas] Change your password ',
      templateData: {
        template: `Hello {{name}}! This is the token for your password change: {{token}}, this expires in 2 hours, be quick`,
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}
