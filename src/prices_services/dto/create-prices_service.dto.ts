import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreatePricesServiceDto {
  @ApiProperty({ example: 'Qon bosimi o‘lchash', description: 'Xizmat nomi' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Oddiy qon bosimi o‘lchash xizmati', description: 'Xizmat haqida batafsil ma’lumot' })
  @IsString()
  description: string;

  @ApiProperty({ example: 20000, description: 'Xizmat narxi so‘mlarda' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 3, description: 'Tegishli payment ID raqami' })
  @IsNumber()
  payment_id: number;
}
