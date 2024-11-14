import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { OrganizationInfo } from './entities/organization-info.entity';
import { Organization } from './entities/organization.entity';
import { CompanyInfoDto } from './dto/company-info.dto';
import { OrganizationDto } from './dto/organization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(OrganizationInfo)
    private orgInfoRepo: Repository<OrganizationInfo>,
    @InjectRepository(Organization)
    private orgRepo: Repository<Organization>,
  ) {}

  create(req: OrganizationDto): Promise<Organization> {
    const user = this.orgRepo.create(req);
    return this.orgRepo.save(user);
  }

  findAll(parentOrgId: number): Promise<Organization[]> {
    return this.orgRepo.find({
      where: { parentOrgId },
    });
  }

  findOne(orgId: number): Promise<Organization> {
    return this.orgRepo.findOneBy({ orgId });
  }

  async findById(orgId: number): Promise<Organization> {
    const res = await this.orgRepo.findOne({
      where: { orgId },
      relations: ['info'],
    });
    return res;
  }

  async update(id: number, req: OrganizationDto): Promise<Organization> {
    await this.orgRepo.update(id, req);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.orgRepo.delete(id);
  }
}
