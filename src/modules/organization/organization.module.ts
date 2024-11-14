import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { OrganizationInfo } from './entities/organization-info.entity';
import { Organization } from './entities/organization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationInfo, Organization])],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
