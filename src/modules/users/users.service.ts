import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PasswordService } from '../auth/password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User> & User> {

    const user: Partial<User> = {
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      password: createUserDto.password,
    };

    try {
      const existedUser = (await this.findAll()).find(
        (u) => u.email === user.email,
      );
      if (existedUser) {
        throw new ConflictException();
      }

      const res = await this.usersRepository.save(user);
      return res;
    } catch (error) {
      Logger.error(error);
      throw new UnauthorizedException();
    }
  }

  async existedUser(email: string) {
    try {
      const user = await this.findByEmail(email);
      if (user) {
        const data = {
          email: user.email,
        };
        return data;
      } else {
        throw new ConflictException();
      }
    } catch (error) {
      throw new ConflictException();
    }
  }

  async updateUserProfile(email: string, firstName: string, lastName: string) {}

  async changeUserPassword(
    email: string,
    oldPassword: string,
    newPassword: string,
  ) {
    try {
      const user = await this.findByEmail(email);
      if (
        user &&
        (await this.passwordService.comparePassword(oldPassword, user.password))
      ) {
        try {
          user.password = await this.passwordService.hashPassword(newPassword);
          // this.updateByEmail(user);
        } catch (error) {
          throw new UnauthorizedException();
        }
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user;
  }

  async updateByEmail(config: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ email: config.email });
    if (!user) {
      throw new Error('User not found');
    }
    return this.usersRepository.save(config);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
