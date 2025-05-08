import { IsString, IsNumber, IsEnum, IsOptional, IsPhoneNumber, IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum DoctorStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class CreateDoctorDto {
  @IsString()
  full_name: string;

  @IsString()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber("UZ")
  phone_number: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  academic_degre: string;

  @IsNumber()
  apec_id: number;

  @IsEnum(Gender)
  gender: Gender;

  @IsNumber()
  experience_years: number;

  @IsEnum(DoctorStatus)
  status: DoctorStatus;

  @IsOptional()
  @IsString()
  profile_image_url?: string;

  @IsString()
  is_active: string;

  @IsOptional()
  @IsString()
  refresh_token?: string;
}
