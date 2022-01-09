import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
  ManyToMany,
  Index,
  OneToMany
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { OrderListProductsEntity } from './orderListProducts.entity';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @Index({ unique: true })
  @PrimaryGeneratedColumn()
  _id?: number;

  @Index({ unique: true })
  @Column()
  displayName!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Index()
  @Column()
  totalRating!: number;

  @Index()
  @Column()
  price!: number;

  @ManyToMany(() => CategoryEntity, (category) => category.products)
  categories!: CategoryEntity[];

  @OneToMany(() => OrderListProductsEntity, (orderListProducts) => orderListProducts.product)
  order_lists?: OrderListProductsEntity[];
}
