import { BaseEntity, Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, ManyToMany } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @Column()
  displayName!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @PrimaryGeneratedColumn()
  @ManyToMany(() => ProductEntity, (product) => product.categoryId)
  _id?: number;
}
