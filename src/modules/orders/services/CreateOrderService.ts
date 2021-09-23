import CustomerRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import ProductsRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

type CreateOrderType = {
  customer_id: string;
  products: IProduct[];
};

export default class CreateOrderService {
  public async execute({
    customer_id,
    products,
  }: CreateOrderType): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customerRepository = getCustomRepository(CustomerRepository);
    const productsRepository = getCustomRepository(ProductsRepository);

    const customer = await customerRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('This Id does not return any User');
    }

    const productsExists = await productsRepository.findAllByIds(products);

    if (!productsExists.length) {
      throw new AppError('This Ids does not return any Products');
    }

    const productsExistsIds = productsExists.map((product) => product.id);

    const checkInexistingProducts = products.filter(
      (product) => !productsExistsIds.includes(product.id),
    );

    if (checkInexistingProducts.length) {
      throw new AppError(
        `Id: ${checkInexistingProducts[0].id} does not return any Product`,
      );
    }

    const quantityAvailable = products.filter(
      (product) =>
        productsExists.filter((p) => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length > 0) {
      throw new AppError(
        `Quantity Error: We do not have this quantity of product: ${quantityAvailable[0].id} available on stock `,
      );
    }

    const serializedProduct = products.map((product) => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productsExists.filter(
        (existingProduct) => existingProduct.id === product.id,
      )[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer,
      products: serializedProduct,
    });

    const { order_products } = order;

    const updatedQuantity = order_products.map((product) => ({
      id: product.product_id,
      quantity:
        productsExists.filter((p) => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedQuantity);

    return order;
  }
}
