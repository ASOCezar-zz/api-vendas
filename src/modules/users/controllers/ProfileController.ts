import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateUserProfileService from '../services/UpdateUserProfileService';

export default class ProfileController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();

    const user_id = request.user.id;

    const user = await showProfile.execute({ user_id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const updateUser = new UpdateUserProfileService();

    const user = await updateUser.execute({
      name,
      email,
      old_password,
      password,
      user_id,
    });

    return response.json(user);
  }
}
