import AppError from '@shared/errors/AppError';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

type ShowOrderType = {
  id: string;
};

export default class ShowOrderService {
  public async execute({ id }: ShowOrderType): Promise<Order> {
    const ordersRepository = new OrdersRepository();

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found');
    }

    return order;
  }
}
