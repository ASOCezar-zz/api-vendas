import { Request, Response } from 'express';
import ResetUserPasswordService from '../services/ResetUserPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetUserPassword = new ResetUserPasswordService();

    await resetUserPassword.execute({ token, password });

    return response.status(204).json();
  }
}
