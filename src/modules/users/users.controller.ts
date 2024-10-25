import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard, Public } from '../../common/guards/auth.guard';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('existedUser')
  existedUser(@Body() signUpDto: Record<string, any>) {
    return this.usersService.existedUser(signUpDto.email);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('updateUserProfile')
  updateUserProfile(@Body() signUpDto: Record<string, any>) {
    return this.usersService.updateUserProfile(
      signUpDto.email,
      signUpDto.firstName,
      signUpDto.lastName,
    );
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('changeUserPassword')
  changeUserPassword(@Body() signUpDto: Record<string, any>) {
    return this.usersService.changeUserPassword(
      signUpDto.email,
      signUpDto.oldPassword,
      signUpDto.newPassword,
    );
  }
}
