import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

type Role = 'vrach' | 'felsher' | 'manager';

export class CreateStaffDto {
  @ApiProperty({ example: 'Ali', description: 'Hodimning ismi' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Valiyev', description: 'Hodimning familiyasi' })
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'aliv', description: 'Foydalanuvchi nomi' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'ali@gmail.com', description: 'Email manzili' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongP@ssw0rd', description: 'Kuchli parol' })
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
  @IsPhoneNumber()
  phone_number: string;

  @ApiProperty({
    example: 'manager',
    description: 'Hodim roli (vrach, felsher, manager)',
    enum: ['vrach', 'felsher', 'manager'],
  })
  role: Role;

}
