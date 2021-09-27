import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IDeleteCustomer } from '../domain/models/IDeleteCustomer';
import { ICustomerRespository } from '../domain/repositories/ICustomerRespository';

@injectable()
export default class DeleteCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRespository,
  ) {}

  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('This user does not exist');
    }

    await this.customerRepository.remove(customer);
  }
}
