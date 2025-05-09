import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'To‘lov qilgan bemor ID raqami' })
  @IsNumber()
  patient_id_pay: number;

  @ApiProperty({ example: 150000, description: 'To‘lov summasi' })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 20240508,
    description: 'To‘lov sanasi (yyyymmdd formatda)',
  })
  @IsNumber()
  payments_date: number;

  @ApiProperty({
    example: 2,
    description: 'To‘lov usuli ID (masalan: 1 - naqd, 2 - karta)',
  })
  @IsNumber()
  payments_method: number;

  @ApiProperty({
    example: 'paid',
    description: 'To‘lov holati (masalan: paid, pending)',
  })
  @IsString()
  status: string;
}
