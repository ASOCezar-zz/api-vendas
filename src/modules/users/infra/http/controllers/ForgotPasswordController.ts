import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordEmailService from '../../../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendEmail = container.resolve(SendForgotPasswordEmailService);

    await sendEmail.execute({ email });

    return response.status(204).json();
  }
}
