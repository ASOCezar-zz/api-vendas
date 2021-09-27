import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IShowCustomer } from '../domain/models/IShowCustomer';
import { ICustomerRespository } from '../domain/repositories/ICustomerRespository';
import Customer from '../infra/typeorm/entities/Customer';

@injectable()
export default class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomerRespository,
  ) {}

  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('This User does not exist');
    }

    return customer;
  }
}
