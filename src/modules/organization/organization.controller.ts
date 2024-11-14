import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthGuard, RolesGuard } from '../../common/guards';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../constants/role.enum';
import { ApiResponse } from '../../common/interfaces/response.interface';

import { OrganizationService } from './organization.service';
import { CompanyInfoDto } from './dto/company-info.dto';
import { OrganizationDto } from './dto/organization.dto';
import { Organization } from './entities/organization.entity';

@Controller('API/Company')
@UseGuards(RolesGuard)
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Get('GetCompanyInfo')
  getDetail(@Body() request: { companyId: number }) {
    return this.organizationService.findById(request.companyId);
  }

  // @UseGuards(AuthGuard)
  // @Roles(Role.Admin)
  // @HttpCode(HttpStatus.OK)
  // @Post('SaveCompanyInfo')
  // saveCompanyInfo(@Body() config: CompanyInfoDto) {
  //   return this.organizationService.updateById(config);
  // }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Get('GetDepartmentList')
  async findAll(@Body() req: { companyId: number }) {
    try {
      const users = await this.organizationService.findAll(req.companyId);
      return {
        status: 'success',
        message: 'Departments retrieved successfully',
        data: users,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: 'Failed to retrieve departments',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Post('SaveDepartment')
  async save(@Body() req: OrganizationDto): Promise<ApiResponse<Organization>> {
    if (req.orgId === 0) {
      try {
        const res = await this.organizationService.create(req);
        return {
          status: 'success',
          message: 'Department created successfully',
          data: res,
        };
      } catch (error) {
        throw new HttpException(
          {
            status: 'error',
            message: 'Failed to create department',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      try {
        const res = await this.organizationService.update(req.orgId, req);
        if (!res) {
          throw new HttpException(
            {
              status: 'error',
              message: 'Department not found',
            },
            HttpStatus.NOT_FOUND,
          );
        }
        return {
          status: 'success',
          message: 'Department updated successfully',
          data: res,
        };
      } catch (error) {
        throw new HttpException(
          {
            status: 'error',
            message: 'Failed to update department',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Post('DeleteDepartment')
  async remove(@Body() req: { departmentId: number }) {
    try {
      await this.organizationService.remove(req.departmentId);
      return {
        status: 'success',
        message: 'Department deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: 'Failed to delete department',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
