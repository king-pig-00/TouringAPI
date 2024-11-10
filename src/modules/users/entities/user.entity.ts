import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  companyId: number;

  @Column()
  positionId: number;

  @Column()
  phoneNumber: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  address2: string;

  @Column()
  countryId: number;

  @Column()
  state: string;

  @Column()
  zipcode: string;

  @Column()
  isActive: string;

  @Column()
  password: string;

  @Column('simple-array')
  roles: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
