import ICreateOrder from '@modules/orders/domain/models/ICreateOrder';
import IOrdersRepository from '@modules/orders/domain/repositories/IOrdersRepository';
import { getRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

export default class OrdersRepository implements IOrdersRepository {
  private ormRespository: Repository<Order>;

  constructor() {
    this.ormRespository = getRepository(Order);
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = await this.ormRespository.findOne(id, {
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  public async createOrder({
    customer,
    products,
  }: ICreateOrder): Promise<Order> {
    const order = this.ormRespository.create({
      customer,
      order_products: products,
    });

    await this.ormRespository.save(order);

    return order;
  }
}
