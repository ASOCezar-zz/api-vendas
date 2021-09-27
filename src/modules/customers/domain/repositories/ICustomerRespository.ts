import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';

export interface ICustomerRespository {
  findById(id: string): Promise<ICustomer | undefined>;
  findByName(name: string): Promise<ICustomer | undefined>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICreateCustomer): Promise<ICustomer>;
  findAll(): Promise<ICustomer[] | undefined>;
  remove(customer: ICreateCustomer): Promise<void>;
}
