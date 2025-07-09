import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSalesLeadDto {
  @IsNotEmpty()
  @IsString()
  leadName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  client?: string;
}
