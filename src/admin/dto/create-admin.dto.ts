import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({ example: 'admin123', description: 'Username of the admin' })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'Email address of the admin',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Phone number of the admin',
  })
  @IsPhoneNumber('UZ')
  phone_number: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd',
    description: 'Password of the admin',
  })
  @IsString()
  hashed_password: string;

  // @ApiProperty({
  //   example: true,
  //   description: 'Whether the admin is active or not',
  // })
  // @IsBoolean()
  // is_active: boolean;

  // @IsBoolean()
  // is_creater: boolean
}
