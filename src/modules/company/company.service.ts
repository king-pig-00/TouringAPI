import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Company } from './entities/company.entity';
import { Department } from './entities/department.entity';
import { CompanyInfoDto } from './dto/company-info.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async findById(companyId: number): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { companyId } });
    return company;
  }

  async updateById(config: CompanyInfoDto) {
    await this.companyRepository.update(config.companyId, config);
    const data = this.findById(config.companyId);
    if (!data) {
      throw new Error('Data not found');
    }
    return data;
  }

  async findAllDepartments(companyId: number): Promise<Department[]> {
    const results = await this.departmentRepository.find({
      where: { companyId },
    });
    return results;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
