import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

type IRequest = {
  id: string;
};

class QueryProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const products = await productsRepository.findOne(id);

    if (!products) {
      throw new AppError('This product does not exist.');
    }
    return products;
  }
}

export default QueryProductService;
