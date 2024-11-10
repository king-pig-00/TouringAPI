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
  email: string;

  @Column()
  companyDescription: string;

  @Column()
  generalPhone: string;
  
  @Column()
  fax: string;

  @Column()
  address: string;

  @Column()
  address2: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;

  @Column({ type: 'longtext' })
  companyLogo: string;

  @Column()
  companyWebsite: string;

  @Column()
  administrator: string;

  @Column()
  timeZone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
