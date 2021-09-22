import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';

type CreateCustomerType = {
  name: string;
  email: string;
};

export default class CreateCustomerService {
  public async execute({ name, email }: CreateCustomerType): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const emailExists = await customerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('This email already in use');
    }

    const customer = customerRepository.create({ name, email });

    await customerRepository.save(customer);

    return customer;
  }
}
