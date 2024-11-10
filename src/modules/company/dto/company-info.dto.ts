import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BeforeInsert } from 'typeorm';

export class CompanyInfoDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  companyDescription: string;

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
  companyLogo: string;

  @IsString()
  companyWebsite: string;

  @IsString()
  administrator: string;

  @IsString()
  @IsNotEmpty()
  timeZone: string;
}
