import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { IsEmail, IsString } from 'class-validator';

import { AuthService } from './auth.service';
import { AuthGuard, Public } from '../../common/guards/auth.guard';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;
}

@Controller('API/Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('Signin')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('Signup')
  signUp(@Body() signUpDto: Record<string, any>) {
    return this.authService.signUp(
      signUpDto.email,
      signUpDto.firstName,
      signUpDto.lastName,
      signUpDto.password,
    );
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('profile')
  getProfile(@Body() signUpDto: Record<string, any>) {
    return this.authService.getProfile(signUpDto.email);
  }
}
