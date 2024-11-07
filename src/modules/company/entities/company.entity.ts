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

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  companyDescription: string;

  @Column()
  companyLogo: string;

  @Column()
  countryId: number;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  zipCode: string;

  @Column()
  address: string;

  @Column()
  fax: string;

  @Column()
  email: string;

  @Column()
  generalPhone: string;

  @Column()
  administrator: string;

  @Column()
  companyWebsite: string;

  @Column()
  timeZone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
