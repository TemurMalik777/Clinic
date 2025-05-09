import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicalrecordDto {
  @ApiProperty({
    description: 'Uchrashuv identifikatori',
    example: 1,
  })
  @IsNumber()
  appointment_id: number;

  @ApiProperty({
    description: 'Tibbiy yozuv ma’lumotlari',
    example: 'Patient is diagnosed with hypertension.',
  })
  @IsString()
  record_data: string;

  @ApiProperty({
    description: 'Davolash haqida ma’lumot',
    example: 'Patient is prescribed medication.',
  })
  @IsString()
  treatment: string;

  @ApiProperty({
    description: 'Diagnoz haqida ma’lumot',
    example: 'Hypertension',
  })
  @IsString()
  diagnosis: string;
}
