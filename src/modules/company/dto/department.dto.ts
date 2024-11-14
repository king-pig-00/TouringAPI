import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BeforeInsert } from 'typeorm';

export class DepartmentDto {
  @IsInt()
  @IsNotEmpty()
  departmentId: number;

  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @IsInt()
  @IsNotEmpty()
  parentDepartmentId: number;

  @IsString()
  @IsNotEmpty()
  departmentName: string;
}
