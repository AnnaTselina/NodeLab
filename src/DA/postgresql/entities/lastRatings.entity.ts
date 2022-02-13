import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lastratings')
export class LastRatingsEntity extends BaseEntity {
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

  @Column()
  updatedAt!: Date;
}
