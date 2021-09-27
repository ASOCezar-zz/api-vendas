import { IUser } from './IUser';

export interface ICreateSession {
  email: string;
  password: string;
}

export interface IResponseCreateSession {
  user: IUser;
  token: string;
}
