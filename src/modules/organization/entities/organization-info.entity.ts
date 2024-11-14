import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

@Entity('organization_info')
export class OrganizationInfo {
  @PrimaryGeneratedColumn()
  orgInfoId: number;

  @Column()
  email: string;

  @Column()
  description: string;

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
  logo: string;

  @Column()
  website: string;

  @Column()
  administrator: string;

  @Column()
  timeZone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
