import { IUpdateQuantity } from '@modules/orders/domain/models/IUpdateQuantity';
import ICreateProduct from '../model/ICreateProduct';
import IFindAllByIds from '../model/IFindAllByIds';
import IProduct from '../model/IProduct';

export default interface IProductsRepository {
  findById(id: string): Promise<IProduct | undefined>;
  findByName(name: string): Promise<IProduct | undefined>;
  findAllByIds(ids: IFindAllByIds[]): Promise<IProduct[]>;
  create(data: ICreateProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
  findAll(): Promise<IProduct[]>;
  save(user: IProduct): Promise<IProduct>;
  updateStock(updatedQuantity: IUpdateQuantity[]): Promise<void>;
}
