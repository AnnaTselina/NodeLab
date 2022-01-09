import { BaseEntity, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderListProductsEntity } from './orderListProducts.entity';
import { UserEntity } from './user.entity';

@Entity('order_list')
export class OrderListEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id!: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user!: UserEntity;

  @OneToMany(() => OrderListProductsEntity, (orderListProducts) => orderListProducts.order_list)
  products!: OrderListProductsEntity[];
}
