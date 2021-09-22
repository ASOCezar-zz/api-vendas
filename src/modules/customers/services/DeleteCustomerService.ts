import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';

type DeleteCustomerType = {
  id: string;
};

export default class DeleteCustomerService {
  public async execute({ id }: DeleteCustomerType): Promise<void> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('This user does not exist');
    }

    await customerRepository.remove(customer);
  }
}
