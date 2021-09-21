import { EntityRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

@EntityRepository(Customer)
export default class CustomerRepository extends Repository<Customer> {
  public async findById(id: string): Promise<Customer | undefined> {
    const user = await this.findOne({ where: { id } });

    return user;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const user = await this.findOne({ where: { name } });

    return user;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const user = await this.findOne({ where: { email } });

    return user;
  }
}
