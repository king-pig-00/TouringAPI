import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = (await this.usersService.findAll()).find(
      (user) => user.email === email,
    );
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (
      user &&
      (await this.passwordService.comparePassword(password, user.password))
    ) {
      const payload = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      const jwtToken = await this.jwtService.signAsync({
        ...payload,
        roleId: user.roleId,
      });
      return {
        success: true,
        data: {
          ...payload,
          redirectUrl: user.roleId === 0 ? '/dashboard' : '/operator',
          token: jwtToken,
        },
      };
    } else {
      return {
        success: false,
        error: 'Invalid email or password',
      };
    }
  }

  async signUp(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ) {
    const createUserDto: CreateUserDto = {
      email,
      firstName,
      lastName,
      password: await this.passwordService.hashPassword(password),
    };

    try {
      const res = await this.usersService.create(createUserDto);
      return {
        success: true,
        data: {
          id: res.id,
          email: res.email,
          firstname: res.firstName,
          lastName: res.lastName,
          token: '',
        },
      };
    } catch (error) {
      throw new ConflictException('Email already exists');
    }
  }

  async getProfile(email: string) {
    try {
      const res = await this.usersService.findByEmail(email);
      const data = {
        ...res,
      };
      return data;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
