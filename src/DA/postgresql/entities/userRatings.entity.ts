import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('userratings')
export class UserRatingsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id?: number;

  @Column()
  userId!: number;

  @Column()
  productId!: number;

  @Column()
  rating!: number;

  @Column({ nullable: true })
  comment?: string;
}
