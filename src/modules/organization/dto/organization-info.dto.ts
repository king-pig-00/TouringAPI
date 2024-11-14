import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BeforeInsert } from 'typeorm';
import { OrganizationDto } from './organization.dto';

export class OrganizationInfoDto extends OrganizationDto {
  info: OrgDetailDto;
}

export class OrgDetailDto {
  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  description: string;

  @IsString()
  generalPhone: string;

  @IsString()
  fax: string;
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  address2: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  logo: string;

  @IsString()
  website: string;

  @IsString()
  administrator: string;

  @IsString()
  @IsNotEmpty()
  timeZone: string;
}
