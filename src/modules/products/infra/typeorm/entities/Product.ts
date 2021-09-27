import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import IProduct from '@modules/products/domain/model/IProduct';
import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => OrdersProducts, (order_products) => order_products.product, {
    cascade: true,
  })
  order_products: OrdersProducts[];

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @Column()
  image: string;

  @Expose({ name: 'image_url' })
  getProductUrl(): string | null {
    if (!this.image) {
      return null;
    }

    return `${process.env.APP_API_URL}/files/products/${this.image}`;
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
