import { IsNumber, IsString } from "class-validator";

export class CreateMedicalrecordDto {

  @IsNumber()
  appointment_id: number;

  @IsString()
  record_data: string;

  @IsString()
  treatment: string;

  @IsString()
  diagnosis: string;
}
