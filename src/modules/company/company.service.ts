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
import { DepartmentDto } from './dto/department.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async createDepartment(req: DepartmentDto) {
    const department: Partial<Department> = {
      companyId: req.companyId,
      parentDepartmentId: req.parentDepartmentId,
      departmentName: req.departmentName,
    };
    const data = await this.departmentRepository.save(department);
    return {
      success: true,
      data,
    };
  }

  async updateDepartment(config: DepartmentDto) {
    await this.departmentRepository.update(config.departmentId, config);
    const data = this.findDepartment(config.departmentId);
    if (!data) {
      throw new Error('Data not found');
    }
    return {
      success: true,
      data,
    };
  }

  async findDepartment(departmentId: number): Promise<Department> {
    const company = await this.departmentRepository.findOne({
      where: { departmentId },
    });
    return company;
  }

  async findById(companyId: number): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { companyId },
    });
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
