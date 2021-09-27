import ICreateOrder from '../models/ICreateOrder';
import IOrder from '../models/IOrder';

export default interface IOrdersRepository {
  findById(id: string): Promise<IOrder | undefined>;

  createOrder({ customer, products }: ICreateOrder): Promise<IOrder>;
}
