import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateProduct } from '../domain/model/ICreateProduct';
import IProduct from '../domain/model/IProduct';
import IProductsRepository from '../domain/repositories/IProductsRepository';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    const sameNameProduct = await this.productsRepository.findByName(name);

    if (sameNameProduct) {
      throw new AppError(
        'This product or a product with same name already exists in our database',
      );
    }

    const product = this.productsRepository.create({
      name,
      price,
      quantity,
    });

    return product;
  }
}

export default CreateProductService;
