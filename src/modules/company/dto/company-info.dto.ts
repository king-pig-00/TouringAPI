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
  @IsNotEmpty()
  companyDescription: string;

  @IsString()
  @IsNotEmpty()
  companyLogo: string;

  @IsNumber()
  @IsNotEmpty()
  countryId: number;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  fax: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  generalPhone: string;

  @IsString()
  @IsNotEmpty()
  companyWebsite: string;

  @IsString()
  @IsNotEmpty()
  administrator: string;

  @IsString()
  @IsNotEmpty()
  timeZone: string;
}
