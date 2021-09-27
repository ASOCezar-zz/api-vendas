import { Request, Response } from 'express';
import ShowProfileService from '../../../services/ShowProfileService';
import UpdateUserProfileService from '../../../services/UpdateUserProfileService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

export default class ProfileController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService);

    const user_id = request.user.id;

    const user = await showProfile.execute({ user_id });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const updateUser = container.resolve(UpdateUserProfileService);

    const user = await updateUser.execute({
      name,
      email,
      old_password,
      password,
      user_id,
    });

    return response.json(classToClass(user));
  }
}
