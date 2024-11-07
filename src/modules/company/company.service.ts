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

  async getCompanyInfo(companyId: number): Promise<Company> {
    const result = await this.findById(companyId);
    return result;
  }

  // async create(createUserDto: CreateUserDto): Promise<Partial<User> & User> {
  //   const user: Partial<User> = {
  //     email: createUserDto.email,
  //     firstName: createUserDto.firstName,
  //     lastName: createUserDto.lastName,
  //     password: createUserDto.password,
  //   };

  //   try {
  //     const existedUser = (await this.findAll()).find(
  //       (u) => u.email === user.email,
  //     );
  //     if (existedUser) {
  //       throw new ConflictException();
  //     }

  //     const res = await this.usersRepository.save(user);
  //     return res;
  //   } catch (error) {
  //     Logger.error(error);
  //     throw new UnauthorizedException();
  //   }
  // }

  // async existedUser(email: string) {
  //   try {
  //     const user = await this.findByEmail(email);
  //     if (user) {
  //       const data = {
  //         email: user.email,
  //       };
  //       return data;
  //     } else {
  //       throw new ConflictException();
  //     }
  //   } catch (error) {
  //     throw new ConflictException();
  //   }
  // }

  // async updateUserProfile(email: string, firstName: string, lastName: string) {}

  // async changeUserPassword(
  //   email: string,
  //   oldPassword: string,
  //   newPassword: string,
  // ) {
  //   try {
  //     const user = await this.findByEmail(email);
  //     if (
  //       user &&
  //       (await this.passwordService.comparePassword(oldPassword, user.password))
  //     ) {
  //       try {
  //         user.password = await this.passwordService.hashPassword(newPassword);
  //         // this.updateByEmail(user);
  //       } catch (error) {
  //         throw new UnauthorizedException();
  //       }
  //     } else {
  //       throw new UnauthorizedException();
  //     }
  //   } catch (error) {
  //     throw new UnauthorizedException();
  //   }
  // }

  // async findAll(): Promise<User[]> {
  //   const users = await this.usersRepository.find();
  //   return users;
  // }

  async findById(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id } });
    return company;
  }

  // async updateByEmail(config: UpdateUserDto) {
  //   const user = await this.usersRepository.findOneBy({ email: config.email });
  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  //   return this.usersRepository.save(config);
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
