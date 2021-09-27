import AppError from '@shared/errors/AppError';
import path from 'path';
import EtherealMail from '@config/mail/EtherealMail';
import SESMail from '@config/mail/SESMail';
import mailConfig from '@config/mail/mail';
import { ISendForgotPassowordEmail } from '../domain/models/ISendForgotPassowordEmail';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import ITokenRepository from '../domain/repositories/ITokenRepository';

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TokenRepository')
    private userTokenRepository: ITokenRepository,
  ) {}

  public async execute({ email }: ISendForgotPassowordEmail): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('This email is not valid');
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    const forgotPasswordEmail = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password_email.hbs',
    );

    if (mailConfig.driver === 'ses') {
      await SESMail.sendMail({
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

      return;
    }

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
