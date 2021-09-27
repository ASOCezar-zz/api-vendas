import IFindAllByIds from '@modules/products/domain/model/IFindAllByIds';
import IProductsRepository from '@modules/products/domain/repositories/IProductsRepository';
import { getRepository, In, Repository } from 'typeorm';
import redisCache from '@shared/cache/RedisCache';
import Product from '../entities/Product';
import ICreateProduct from '@modules/products/domain/model/ICreateProduct';
import { IUpdateQuantity } from '@modules/orders/domain/models/IUpdateQuantity';

export default class ProductsRepository implements IProductsRepository {
  private ormRespository: Repository<Product>;

  constructor() {
    this.ormRespository = getRepository(Product);
  }
  async updateStock(updatedQuantity: IUpdateQuantity[]): Promise<void> {
    await this.ormRespository.save(updatedQuantity);
  }

  async save(product: Product): Promise<Product> {
    await this.ormRespository.save(product);

    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.ormRespository.find();
    return products;
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const product = this.ormRespository.create({ name, price, quantity });

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.ormRespository.save(product);

    return product;
  }

  public async remove(product: Product): Promise<void> {
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await this.ormRespository.remove(product);
  }

  public async findByName(name: string): Promise<Product | undefined> {
    return this.ormRespository.findOne({
      where: { name },
    });
  }
  public async findById(id: string): Promise<Product | undefined> {
    return this.ormRespository.findOne(id);
  }
  public async findAllByIds(products: IFindAllByIds[]): Promise<Product[]> {
    const productsIds = products.map((product) => product.id);

    const existsProducts = await this.ormRespository.find({
      where: {
        id: In(productsIds),
      },
    });

    return existsProducts;
  }
}
