import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

import { OrganizationInfo } from './organization-info.entity';

@Entity('organization')
export class Organization {
  @PrimaryGeneratedColumn()
  orgId: number;

  @Column()
  parentOrgId: number;

  @Column()
  orgName: string;

  @OneToOne(() => OrganizationInfo, { eager: true })
  @JoinColumn({ name: 'orgInfoId' })
  info: OrganizationInfo;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
