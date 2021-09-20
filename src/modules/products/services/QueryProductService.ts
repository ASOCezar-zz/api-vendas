import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

type IRequest = {
  id: string;
  name: string;
};

class QueryProductService {
  public async execute({ id, name }: IRequest): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductsRepository);

    if (id) {
      const products = await productsRepository.findOne(id);

      if (!products) {
        throw new AppError('This product does not exist.');
      }
      return products;
    }

    if (name) {
      const products = await productsRepository.findByName(name);

      if (!products) {
        throw new AppError('This product does not exist.');
      }

      return products;
    }
  }
}

export default QueryProductService;
