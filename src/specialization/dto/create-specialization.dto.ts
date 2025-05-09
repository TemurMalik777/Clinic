import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpecializationDto {
  @ApiProperty({ example: 'Cardiology', description: 'Specializatsiya nomi' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Heart related conditions and treatments',
    description: 'Specializatsiya tavsifi',
  })
  @IsString()
  description: string;
}
