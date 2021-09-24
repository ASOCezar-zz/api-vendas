import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';

type RequestType = {
  id: string;
};

class DeleteProductService {
  public async execute({ id }: RequestType): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('This product does not exist.');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
