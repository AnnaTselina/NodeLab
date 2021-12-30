import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('userRatings')
export class UserRatingsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id?: number;

  @Column()
  userId!: number;

  @Column()
  productId!: string;

  @Column()
  rating!: string;

  @Column({ nullable: true })
  comment?: string;
}
