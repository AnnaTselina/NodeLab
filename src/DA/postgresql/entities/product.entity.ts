import { BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id?: number;

  @Column()
  displayName!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  totalRating!: number;

  @Column()
  price!: number;

  @ManyToOne(() => CategoryEntity, (category) => category._id)
  categoryId!: number;
}
