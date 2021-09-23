import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
  quantity: number;
}

@EntityRepository(Product)
export default class ProductsRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    return this.findOne({
      where: { name },
    });
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map((product) => product.id);

    const productsExists = await this.find({ where: { id: In(productsIds) } });

    return productsExists;
  }
}
