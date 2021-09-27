import { ICustomerRespository } from '@modules/customers/domain/repositories/ICustomerRespository';
import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import IOrdersRepository from '@modules/orders/domain/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import IProductsRepository from '@modules/products/domain/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import ITokenRepository from '@modules/users/domain/repositories/ITokenRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICustomerRespository>(
  'CustomerRepository',
  CustomerRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ITokenRepository>(
  'TokenRepository',
  UserTokenRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);
