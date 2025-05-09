import {
  IsEmail,
  IsEnum,
  IsLowercase,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { IsEmailUnique } from '../../common/qoshimcha.validator';
import { Patient } from '../models/patient.model';

// type Enum = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export enum BooldType {
  'A+' = 'A+',
  'A-' = 'A-',
  'B+' = 'B+',
  'B-' = 'B-',
  'AB+' = 'AB+',
  'AB-' = 'AB-',
  'O+' = 'O+',
  'O-' = 'O-',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class CreatePatientDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  date_of_birth: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsEmail()
  @IsLowercase()
  @IsEmailUnique(Patient, { message: 'This email is already in use!' })
  email: string;

  @IsPhoneNumber('UZ')
  phone_number: string;

  @IsString()
  is_active: string;

  @IsEnum(BooldType)
  boold_type: BooldType;

  @IsStrongPassword()
  password: string;
  
  @IsString()
  confirm_password: string;
}
