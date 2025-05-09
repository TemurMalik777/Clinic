import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicationDto {
  @ApiProperty({
    description: 'Dori vositasining nomi',
    example: 'Paracetamol',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Dori vositasining dozasi',
    example: '500mg',
  })
  @IsString()
  dosage: string;

  @ApiProperty({
    description: 'Dori vositasining tavsifi',
    example: 'Yengil og‘riq va isitmani tushirish uchun dori',
  })
  @IsString()
  description: string;
}
