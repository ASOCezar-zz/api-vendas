import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';

type RequestType = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

class UpdateProductService {
  public async execute({
    id,
    name,
    quantity,
    price,
  }: RequestType): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const sameNameProduct = await productsRepository.findByName(name);
    const product = await productsRepository.findOne(id);

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

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
