import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';

import { AuthGuard, Public } from '../../common/guards/auth.guard';
import { UsersService } from './users.service';

@Controller('API/User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('SaveUserDetail')
  updateUserProfile(@Body() signUpDto: Record<string, any>) {
    return this.usersService.updateUserProfile(
      signUpDto.email,
      signUpDto.firstName,
      signUpDto.lastName,
    );
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('ChangeUserPassword')
  changeUserPassword(@Body() signUpDto: Record<string, any>) {
    return this.usersService.changeUserPassword(
      signUpDto.email,
      signUpDto.oldPassword,
      signUpDto.newPassword,
    );
  }
}
