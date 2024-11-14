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
import { OrgDetailDto } from './dto/organization-info.dto';
import { OrganizationDto } from './dto/organization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(OrganizationInfo)
    private orgInfoRepo: Repository<OrganizationInfo>,
    @InjectRepository(Organization)
    private orgRepo: Repository<Organization>,
  ) {}

  async create(req: OrganizationDto): Promise<Organization> {
    const user = this.orgRepo.create({
      parentOrgId: req.parentOrgId,
      orgName: req.orgName,
    });
    return await this.orgRepo.save(user);
  }

  async findAll(): Promise<Organization[]> {
    const res = await this.orgRepo.find();
    return res;
  }

  findAllByPId(parentOrgId: number): Promise<Organization[]> {
    return this.orgRepo.find({
      where: { parentOrgId },
    });
  }

  findOne(orgId: number): Promise<Organization> {
    return this.orgRepo.findOneBy({ orgId });
  }

  findById(orgId: number): Promise<Organization> {
    const res = this.orgRepo.findOne({
      where: { orgId },
      relations: ['info'],
    });
    return res;
  }

  async update(orgId: number, req: OrganizationDto): Promise<Organization> {
    await this.orgRepo.update(orgId, req);
    return this.findOne(orgId);
  }

  async updateDetail(
    orgInfoId: number,
    req: OrgDetailDto,
  ): Promise<OrganizationInfo> {
    await this.orgInfoRepo.update(orgInfoId, req);
    return this.orgInfoRepo.findOneBy({ orgInfoId });
  }

  async remove(orgId: number): Promise<void> {
    await this.orgRepo.delete(orgId);
  }
}
