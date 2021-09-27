export default interface IOrderProducts {
  id: string;
  price: number;
  quantity: number;
  product_id: string;
  order_id: string;
  created_at: Date;
  updated_at: Date;
}
