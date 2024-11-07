import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';

import { AuthGuard, RolesGuard } from '../../common/guards';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../constants/role.enum';

import { CompanyService } from './company.service';
import { CompanyInfoDto } from './dto/company-info.dto';

@Controller('API/Company')
@UseGuards(RolesGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Get('GetCompanyInfo')
  getCompanyInfo(@Body() request: { id: number }) {
    return this.companyService.getCompanyInfo(request.id);
  }

  // @UseGuards(AuthGuard)
  // @Roles(Role.Admin)
  // @HttpCode(HttpStatus.OK)
  // @Post('SaveUserDetail')
  // updateUserProfile(@Body() signUpDto: Record<string, any>) {
  //   return this.companySettingsService.updateUserProfile(
  //     signUpDto.email,
  //     signUpDto.firstName,
  //     signUpDto.lastName,
  //   );
  // }

  // @UseGuards(AuthGuard)
  // @Roles(Role.Admin)
  // @HttpCode(HttpStatus.OK)
  // @Post('ChangeUserPassword')
  // changeUserPassword(@Body() signUpDto: Record<string, any>) {
  //   return this.usersService.changeUserPassword(
  //     signUpDto.email,
  //     signUpDto.oldPassword,
  //     signUpDto.newPassword,
  //   );
  // }
}
