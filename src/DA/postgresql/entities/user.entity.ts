import { BaseEntity, Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  firstname?: string;

  @Column({ nullable: true })
  lastname?: string;

  @PrimaryGeneratedColumn()
  _id?: number;
}
