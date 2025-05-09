import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLabTestDto {
  @ApiProperty({
    description: 'Bemorga tegishli ID',
    type: Number,
  })
  @IsNumber()
  patient_id: number;

  @ApiProperty({
    description: 'Laboratoriya testi nomi',
    type: String,
  })
  @IsString()
  test_name: string;

  @ApiProperty({
    description: 'Laboratoriya testi sanasi',
    type: String,
  })
  @IsString()
  test_date: string;

  @ApiProperty({
    description: 'Bemorga natijalar',
    type: String,
  })
  @IsString()
  result_patient: string;
}
