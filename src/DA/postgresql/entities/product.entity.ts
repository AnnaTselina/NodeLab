import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
  ManyToMany,
  JoinTable,
  Index
} from 'typeorm';
import { CategoryEntity } from './category.entity';

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

  @ManyToMany(() => CategoryEntity, (category) => category._id)
  @JoinTable()
  categoryId!: number;
}
