import { IsNumber, IsString } from "class-validator";

export class CreatePricesServiceDto {

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  payment_id: number;
}
