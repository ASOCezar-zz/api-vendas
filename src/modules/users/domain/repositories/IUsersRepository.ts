import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';

export interface IUsersRepository {
  findById(id: string): Promise<IUser | undefined>;
  findByName(name: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  create(data: ICreateUser): Promise<IUser>;
  findAll(): Promise<IUser[] | undefined>;
  save(user: IUser): Promise<IUser>;
}
