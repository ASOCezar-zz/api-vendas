import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomerRespository } from '@modules/customers/domain/repositories/ICustomerRespository';
import { getRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

export default class CustomerRepository implements ICustomerRespository {
  private ormRespository: Repository<Customer>;

  constructor() {
    this.ormRespository = getRepository(Customer);
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRespository.create({ name, email });

    await this.ormRespository.save(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.ormRespository.save(customer);

    return customer;
  }

  public async remove(customer: Customer): Promise<void> {
    await this.ormRespository.remove(customer);
  }

  public async findAll(): Promise<Customer[] | undefined> {
    const customers = await this.ormRespository.find();

    return customers;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRespository.findOne({ where: { id } });

    return customer;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.ormRespository.findOne({ where: { name } });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRespository.findOne({ where: { email } });

    return customer;
  }
}
