import { IsNumber, IsString } from 'class-validator';

export class CreateLabTestDto {
  @IsNumber()
  patient_id: number;

  @IsString()
  test_name: string;

  @IsString()
  test_date: string;

  @IsString()
  result_patient: string;
}
