import { BaseEntity, Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @Column()
  displayName!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @PrimaryGeneratedColumn()
  _id?: number;

  @ManyToMany(() => ProductEntity, (product) => product.categories, { cascade: true })
  @JoinTable({
    name: 'products_categories',
    joinColumn: {
      name: 'category_id',
      referencedColumnName: '_id'
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: '_id'
    }
  })
  products?: ProductEntity[];
}
