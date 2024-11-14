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
import { Response } from 'express';

import { AuthGuard, RolesGuard } from '../../common/guards';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../constants/role.enum';

import { CompanyService } from './company.service';
import { CompanyInfoDto } from './dto/company-info.dto';
import { DepartmentDto } from './dto/department.dto';

@Controller('API/Company')
@UseGuards(RolesGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Get('GetCompanyInfo')
  getCompanyInfo(@Body() request: { companyId: number }) {
    return this.companyService.findById(request.companyId);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Post('SaveCompanyInfo')
  saveCompanyInfo(@Body() config: CompanyInfoDto) {
    return this.companyService.updateById(config);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Get('GetDepartmentList')
  getDepartmentList(@Body() req: { companyId: number }) {
    return this.companyService.findAllDepartments(req.companyId);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Post('SaveDepartment')
  async saveDepartment(@Body() req: DepartmentDto, @Res() res: Response) {
    if (req.departmentId === 0) {
      const result = await this.companyService.createDepartment(req);
      return res.status(HttpStatus.OK).json(result);
    } else {
      const result = await this.companyService.updateDepartment(req);
      return res.status(HttpStatus.OK).json(result);
    }
  }

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
