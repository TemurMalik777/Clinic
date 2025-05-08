import { IsString } from 'class-validator';

export class CreateMedicationDto {
  @IsString()
  name: string;

  @IsString()
  dosage: string;

  @IsString()
  description: string;
}
