import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IDeleteProduct } from '../domain/model/IDeleteProduct';
import IProduct from '../domain/model/IProduct';
import IProductsRepository from '../domain/repositories/IProductsRepository';

@injectable()
class QueryProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IDeleteProduct): Promise<IProduct> {
    const products = await this.productsRepository.findById(id);

    if (!products) {
      throw new AppError('This product does not exist.');
    }
    return products;
  }
}

export default QueryProductService;
