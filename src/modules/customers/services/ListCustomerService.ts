import { inject, injectable } from 'tsyringe';

import { ICustomer } from '../domain/models/ICustomer';
import { ICustomerRespository } from '../domain/repositories/ICustomerRespository';

@injectable()
export default class ListCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRespository,
  ) {}

  public async execute(): Promise<ICustomer[] | undefined> {
    const customer = await this.customerRepository.findAll();

    return customer;
  }
}
