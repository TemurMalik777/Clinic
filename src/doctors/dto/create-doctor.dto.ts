import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum DoctorStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class CreateDoctorDto {
  @ApiProperty({ example: 'Dr. Anvar Salomov' })
  @IsString()
  full_name: string;

  @ApiProperty({ example: 'anvarsalomov' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'anvar@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+998901234567' })
  @IsPhoneNumber('UZ')
  phone_number: string;

  @ApiProperty({ example: 'StrongP@ssw0rd!' })
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'PhD' })
  @IsString()
  academic_degre: string;

  @ApiProperty({ example: 101 })
  @IsNumber()
  apec_id: number;

  @ApiProperty({ enum: Gender, example: Gender.MALE })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ example: 5 })
  @IsNumber()
  experience_years: number;

  @ApiProperty({ enum: DoctorStatus, example: DoctorStatus.ACTIVE })
  @IsEnum(DoctorStatus)
  status: DoctorStatus;

  @ApiPropertyOptional({ example: 'https://example.com/images/doctor.jpg' })
  @IsOptional()
  @IsString()
  profile_image_url: string;

  @ApiProperty({ example: 'true' })
  @IsString()
  is_active: string;

  @ApiPropertyOptional({ example: 'refresh_token_example_here' })
  @IsOptional()
  @IsString()
  refresh_token: string;
}
