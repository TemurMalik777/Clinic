import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentMethodDto {
  @ApiProperty({ example: 'Naqd', description: 'To‘lov usuli nomi' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Naqd to‘lov orqali to‘lov usuli', description: 'To‘lov usuli haqida tavsif' })
  @IsString()
  description: string;
}
