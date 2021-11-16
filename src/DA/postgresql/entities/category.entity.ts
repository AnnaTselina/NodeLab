import { BaseEntity, Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, OneToMany } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @Column()
  displayName!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @PrimaryGeneratedColumn()
  @OneToMany(() => ProductEntity, (product) => product.categoryId)
  _id?: number;
}
