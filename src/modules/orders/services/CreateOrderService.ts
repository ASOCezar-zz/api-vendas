import { ICustomerRespository } from '@modules/customers/domain/repositories/ICustomerRespository';
import IProductsRepository from '@modules/products/domain/repositories/IProductsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IOrder from '../domain/models/IOrder';
import { IRequestCreateOrder } from '../domain/models/IRequestCreateOrder';
import IOrdersRepository from '../domain/repositories/IOrdersRepository';

@injectable()
export default class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CustomerRepository')
    private customerRepository: ICustomerRespository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    customer_id,
    products,
  }: IRequestCreateOrder): Promise<IOrder> {
    const customer = await this.customerRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('This Id does not return any User');
    }

    const productsExists = await this.productsRepository.findAllByIds(products);

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

    const order = await this.ordersRepository.createOrder({
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

    await this.productsRepository.updateStock(updatedQuantity);

    return order;
  }
}
