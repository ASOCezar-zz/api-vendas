import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export default class UsersRepository implements IUsersRepository {
  private ormRespository: Repository<User>;

  constructor() {
    this.ormRespository = getRepository(User);
  }

  findAll(): Promise<IUser[] | undefined> {
    const users = this.ormRespository.find();

    return users;
  }

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = this.ormRespository.create({ name, email, password });

    await this.ormRespository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRespository.save(user);
    return user;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.ormRespository.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRespository.findOne({
      where: { id },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRespository.findOne({
      where: { email },
    });

    return user;
  }
}
