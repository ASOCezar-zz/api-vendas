import IOrderProducts from '@modules/orders/domain/models/IOrderProducts';

export default interface IProduct {
  id: string;
  order_products: IOrderProducts[];
  name: string;
  price: number;
  quantity: number;
  image: string;
  created_at: Date;
  updated_at: Date;
}
