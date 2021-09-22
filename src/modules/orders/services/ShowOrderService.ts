import AppError from '@shared/errors/AppError';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

type ShowOrderType = {
  id: string;
};

export default class ShowOrderService {
  public async execute({ id }: ShowOrderType) {
    const ordersRepository = new OrdersRepository();

    const order = ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found');
    }

    return order;
  }
}
