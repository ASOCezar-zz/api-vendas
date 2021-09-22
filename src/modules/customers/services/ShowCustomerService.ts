import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';

type ShowCustomerType = {
  id: string;
};

export default class ShowCustomerService {
  public async execute({ id }: ShowCustomerType): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('This User does not exist');
    }

    return customer;
  }
}
