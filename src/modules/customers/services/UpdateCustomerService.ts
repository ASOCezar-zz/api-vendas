import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
import { ICustomerRespository } from '../domain/repositories/ICustomerRespository';
import Customer from '../infra/typeorm/entities/Customer';

@injectable()
export default class UpdateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRespository,
  ) {}

  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('This customer does not exist');
    }

    const emailInUse = await this.customerRepository.findByEmail(email);

    if (email !== customer.email && emailInUse) {
      throw new AppError('This email is already in use');
    }

    customer.email = email;
    customer.name = name;

    await this.customerRepository.save(customer);

    return customer;
  }
}
