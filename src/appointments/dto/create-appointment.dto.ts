import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ example: 1, description: 'Bemor ID raqami' })
  @IsNumber()
  patient_id: number;

  @ApiProperty({ example: 5, description: 'Shifokor ID raqami' })
  @IsNumber()
  doctor_id: number;

  @ApiProperty({
    example: 1715182800,
    description: 'Uchrashuv vaqti (timestamp formatida)',
  })
  @IsNumber()
  appointment_time: number;

  @ApiProperty({
    example: 'pending',
    description: 'Uchrashuv holati: pending, confirmed, cancelled va hokazo',
  })
  @IsString()
  status: string;

  @ApiProperty({
    example: 1715186400,
    description: 'Rejalashtirilgan vaqt (timestamp formatida)',
  })
  @IsNumber()
  scheduled_time: number;

  @ApiProperty({
    example: 2,
    description: 'Sabab ID raqami (masalan, 2 - Tekshiruv uchun)',
  })
  @IsNumber()
  reason: number;
}
