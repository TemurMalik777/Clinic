import { IsOptional, IsString, IsNumberString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetClinicQueryDto {
  @ApiPropertyOptional({
    example: 'GrandMed',
    description: 'Klinika nomi bo‘yicha qidirish',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Tashkent',
    description: 'Manzil bo‘yicha qidirish',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    example: 'desc',
    description: 'Reyting bo‘yicha sortlash (asc/desc)',
  })
  @IsOptional()
  @IsString()
  sortByRating?: 'asc' | 'desc';

  @ApiPropertyOptional({ example: '1', description: 'Qaysi sahifa' })
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiPropertyOptional({
    example: '10',
    description: 'Har sahifada nechta element',
  })
  @IsOptional()
  @IsNumberString()
  limit?: number;
}
