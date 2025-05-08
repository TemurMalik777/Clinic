import { IsNumber, IsString } from 'class-validator';

export class CreatePrescriptionDto {
  @IsNumber()
  doctor_id: number;

  @IsNumber()
  patient_id: number;

  @IsNumber()
  medication_id: number;

  @IsString()
  dosage: string;

  @IsString()
  prescription_date: string;

  @IsString()
  frequency: string;

  @IsString()
  instructions: string;
}
