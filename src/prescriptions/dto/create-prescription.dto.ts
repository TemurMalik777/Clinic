import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrescriptionDto {
  @ApiProperty({ example: 1, description: 'Doktor IDsi' })
  @IsNumber()
  doctor_id: number;

  @ApiProperty({ example: 1, description: 'Bemor IDsi' })
  @IsNumber()
  patient_id: number;

  @ApiProperty({ example: 1, description: 'Dori IDsi' })
  @IsNumber()
  medication_id: number;

  @ApiProperty({ example: '20 mg', description: 'Doza' })
  @IsString()
  dosage: string;

  @ApiProperty({ example: '2025-05-08', description: 'Retsept berilgan sana' })
  @IsString()
  prescription_date: string;

  @ApiProperty({
    example: '3 marta kuniga',
    description: 'Doza qabul qilish chastotasi',
  })
  @IsString()
  frequency: string;

  @ApiProperty({
    example: 'Dori ovqatdan keyin qabul qilinsin',
    description: 'Ko‘rsatmalar',
  })
  @IsString()
  instructions: string;
}
