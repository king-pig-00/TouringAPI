import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Company } from './entities/company.entity';
import { CompanyInfoDto } from './dto/company-info.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async findById(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id } });
    return company;
  }

  async updateById(config: CompanyInfoDto) {
    await this.companyRepository.update(config.id, config);
    const data = this.findById(config.id);
    if (!data) {
      throw new Error('Data not found');
    }
    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
