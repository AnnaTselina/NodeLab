import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderListEntity } from './orderList.entity';
import { ProductEntity } from './product.entity';

@Entity('order_list_products')
export class OrderListProductsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id!: number;

  @Column({ default: 1 })
  quantity!: number;

  @ManyToOne(() => OrderListEntity, (orderList) => orderList.products)
  order_list!: OrderListEntity;

  @ManyToOne(() => ProductEntity, (product) => product.order_lists)
  product!: ProductEntity;
}
