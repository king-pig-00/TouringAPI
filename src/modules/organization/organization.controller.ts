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
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthGuard, RolesGuard } from '../../common/guards';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../constants/role.enum';

import { OrganizationService } from './organization.service';
import { OrganizationInfoDto } from './dto/organization-info.dto';
import { OrganizationDto } from './dto/organization.dto';

@Controller('API/Company')
@UseGuards(RolesGuard)
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Get('GetCompanyInfo')
  async getDetail(@Body() req: { companyId: number }, @Res() res: Response) {
    try {
      const result = await this.organizationService.findById(req.companyId);
      return res.json({
        success: true,
        message: 'Company info retrieved successfully',
        data: result,
      });
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to retrieve company info',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Post('SaveCompanyInfo')
  async saveDetail(@Body() req: OrganizationInfoDto, @Res() res: Response) {
    try {
      const result1 = await this.organizationService.update(req.orgId, {
        orgId: req.orgId,
        parentOrgId: req.parentOrgId,
        orgName: req.orgName,
      });
      const result2 = await this.organizationService.updateDetail(
        req.orgId,
        req.info,
      );
      if (!result1 || !result2) {
        throw new HttpException(
          {
            success: false,
            message: 'Company data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return res.json({
        success: true,
        message: 'Company info updated successfully',
        data: '',
      });
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to update company info',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @Get('GetDepartmentList')
  async findAll(@Body() req: { companyId: number }, @Res() res: Response) {
    try {
      const results = await this.organizationService.findAllByPId(
        req.companyId,
      );
      return res.json({
        success: true,
        message: 'Departments retrieved successfully',
        data: results,
      });
    } catch (error) {
      throw new HttpException(
        {
          success: false,
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
  async save(@Body() req: OrganizationDto, @Res() res: Response) {
    const existedDepartment = (await this.organizationService.findAll()).find(
      (dep) => dep.orgName === req.orgName,
    );
    if (existedDepartment) {
      throw new ConflictException();
    }
    if (req.orgId === -1) {
      try {
        const result = await this.organizationService.create(req);
        res.json({
          success: true,
          message: 'Department created successfully',
          data: result,
        });
      } catch (error) {
        throw new HttpException(
          {
            success: false,
            message: 'Failed to create department',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      try {
        const result = await this.organizationService.update(req.orgId, req);
        if (!result) {
          throw new HttpException(
            {
              success: false,
              message: 'Department not found',
            },
            HttpStatus.NOT_FOUND,
          );
        }
        return res.json({
          success: true,
          message: 'Department updated successfully',
          data: result,
        });
      } catch (error) {
        throw new HttpException(
          {
            success: false,
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
  async remove(@Body() req: { orgId: number }, @Res() res: Response) {
    try {
      await this.organizationService.remove(req.orgId);
      return res.json({
        success: true,
        message: 'Department deleted successfully',
      });
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to delete department',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
