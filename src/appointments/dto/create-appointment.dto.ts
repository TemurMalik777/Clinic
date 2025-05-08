import { IsNumber, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNumber()
  patient_id: number;

  @IsNumber()
  doctor_id: number;

  @IsNumber()
  appointment_time: number;

  @IsString()
  status: string;

  @IsNumber()
  scheduled_time: number;

  @IsNumber()
  reason: number;
}
