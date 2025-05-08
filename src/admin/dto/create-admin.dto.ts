import { IsBoolean, IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber("UZ")
  phone_number: string;

  @IsString()
  password: string;

  @IsBoolean()
  is_active: boolean;
}
