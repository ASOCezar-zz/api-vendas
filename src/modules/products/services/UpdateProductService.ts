import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IProduct from '../domain/model/IProduct';
import { IUpdateProduct } from '../domain/model/IUpdateProduct';
import IProductsRepository from '../domain/repositories/IProductsRepository';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    id,
    name,
    quantity,
    price,
  }: IUpdateProduct): Promise<IProduct> {
    const sameNameProduct = await this.productsRepository.findByName(name);
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('This product does not exist');
    }
    if (sameNameProduct) {
      throw new AppError(
        'This product or a product with same name already exists in our database',
      );
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
