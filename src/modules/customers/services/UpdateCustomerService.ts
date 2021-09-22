import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';

type UpdateCustomerType = {
  id: string;
  name: string;
  email: string;
};

export default class UpdateCustomerService {
  public async execute({
    id,
    name,
    email,
  }: UpdateCustomerType): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('This customer does not exist');
    }

    const emailInUse = await customerRepository.findByEmail(email);

    if (email !== customer.email && emailInUse) {
      throw new AppError('This email is already in use');
    }

    customer.email = email;
    customer.name = name;

    await customerRepository.save(customer);

    return customer;
  }
}
