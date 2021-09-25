import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';

type RequestType = {
  name: string;
  price: number;
  quantity: number;
};

class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
  }: RequestType): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const sameNameProduct = await productsRepository.findByName(name);

    if (sameNameProduct) {
      throw new AppError(
        'This product or a product with same name already exists in our database',
      );
    } else {
      const product = productsRepository.create();
      product.name = name;
      product.price = price;
      product.quantity = quantity;

      await redisCache.invalidate('api-vendas-PRODUCT_LIST');

      await productsRepository.save(product);

      return product;
    }
  }
}

export default CreateProductService;
