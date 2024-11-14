import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BeforeInsert } from 'typeorm';

export class OrganizationDto {
  @IsInt()
  @IsNotEmpty()
  orgId: number;

  @IsInt()
  @IsNotEmpty()
  parentOrgId: number;

  @IsString()
  @IsNotEmpty()
  orgName: string;
}
