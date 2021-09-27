import { ICustomer } from '@modules/customers/domain/models/ICustomer';

export default interface ICreateOrder {
  customer: ICustomer;
  products: {
    product_id: string;
    quantity: number;
    price: number;
  }[];
}
