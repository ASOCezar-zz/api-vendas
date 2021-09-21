import User from '../typeorm/entities/User';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';

type RequestType = {
  name: string;
  email: string;
  password: string;
};

class CreateUserService {
  public async execute({ name, email, password }: RequestType): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('This email already is linked to an user');
    }

    const passwordHashed = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
