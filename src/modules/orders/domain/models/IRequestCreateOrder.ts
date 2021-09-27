import IProduct from '@modules/products/domain/model/IProduct';

export interface IRequestCreateOrder {
  customer_id: string;
  products: IProduct[];
}
