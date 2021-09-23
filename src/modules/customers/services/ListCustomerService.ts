import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';

interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  last_page: number;
  data: Customer[];
}

export default class ListCustomerService {
  public async execute(): Promise<IPaginateCustomer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.createQueryBuilder().paginate();

    return customer as IPaginateCustomer;
  }
}
