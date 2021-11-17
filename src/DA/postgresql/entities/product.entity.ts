import { BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, Entity, ManyToMany, JoinTable } from 'typeorm';
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

  @ManyToMany(() => CategoryEntity, (category) => category._id)
  @JoinTable()
  categoryId!: number;
}
