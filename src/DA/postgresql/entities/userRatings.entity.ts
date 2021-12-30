import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('userRatings')
export class UserRatings extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id?: number;

  @Column()
  userId!: number;

  @Column()
  productId!: number;

  @Column()
  rating!: number;

  @Column()
  comment?: string;
}
