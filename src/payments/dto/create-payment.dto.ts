import { IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  patient_id: number;

  @IsNumber()
  amount: number;

  @IsNumber()
  payments_date: number;

  @IsNumber()
  payments_method: number;

  @IsString()
  status: string;
}
