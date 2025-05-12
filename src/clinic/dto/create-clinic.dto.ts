// src/clinics/dto/create-clinic.dto.ts
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClinicDto {
  @ApiProperty({ example: 'Shifo Med', description: 'Klinika nomi' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Toshkent, Chilonzor', description: 'Manzili' })
  @IsString()
  address: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
  @IsString()
  phone: string;
}
