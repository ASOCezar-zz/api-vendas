import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

type UpdateUserProfileType = {
  name: string;
  password?: string;
  old_password?: string;
  email: string;
  user_id: string;
};

export default class UpdateUserProfileService {
  public async execute({
    name,
    email,
    password,
    old_password,
    user_id,
  }: UpdateUserProfileType): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('This user does not exist');
    }

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists && emailExists.id !== user_id) {
      throw new AppError('This email there is already in use');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password is incorrect');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}
