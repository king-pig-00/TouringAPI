import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { IsEmail, IsString } from 'class-validator';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { AuthGuard, Public } from '../../common/guards/auth.guard';
import { SignInDto } from './dto/siginin.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('API/Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('Signin')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const result = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    if (result.success) {
      return res.status(HttpStatus.OK).json(result);
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json(result);
    }
  }

  @Public()
  @Post('Signup')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    try {
      const result = await this.authService.signUp(
        signUpDto.email,
        signUpDto.firstName,
        signUpDto.lastName,
        signUpDto.password,
      );
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('profile')
  getProfile(@Body() signUpDto: Record<string, any>) {
    return this.authService.getProfile(signUpDto.email);
  }
}
