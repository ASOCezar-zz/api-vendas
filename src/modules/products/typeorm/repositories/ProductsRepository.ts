import { EntityRepository, Repository } from 'typeorm';

<<<<<<< HEAD
interface IFindProducts {
  id: string;
  quantity: number;
}
=======
import Product from '../entities/Product';
>>>>>>> parent of 16ea7cf... Create Order Service

@EntityRepository(Product)
export default class ProductsRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    return this.findOne({
      where: { name },
    });
  }
}
