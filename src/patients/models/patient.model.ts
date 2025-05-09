import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { LabTest } from '../../lab_tests/models/lab_test.model';
import { Payment } from '../../payments/models/payment.models';
import { Prescription } from '../../prescriptions/models/prescription.model';
import { Appointment } from '../../appointments/models/appointment.model';

// type Enum = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

interface IPatientsCreationAttr {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: 'male' | 'female';
  email: string;
  phone_number: string;
  is_active: string;
  boold_type: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  hashed_password: string;
}

@Table({ tableName: 'patients' })
export class Patient extends Model<Patient, IPatientsCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 'Ali',
    description: 'Foydalnuvchi ismi',
  })
  @Column({
    type: DataType.STRING,
  })
  declare first_name: string;

  @ApiProperty({
    example: 'Valiyev',
    description: 'Foydalnuvchi familyasi',
  })
  @Column({
    type: DataType.STRING,
  })
  declare last_name: string;

  @ApiProperty({
    example: '14.12.1987',
    description: "Foydalnuvchi tug'ulgan sanasi",
  })
  @Column({
    type: DataType.DATE,
  })
  declare date_of_birth: string;

  @ApiProperty({
    example: 'male',
    description: 'Foydalnuvchi jinsi',
  })
  @Column({
    type: DataType.ENUM('male', 'female'),
  })
  declare gender: 'male' | 'female';

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  declare is_active: string;

  @Column({
    type: DataType.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
  })
  declare boold_type: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

  @Column({
    type: DataType.STRING,
  })
  declare hashed_password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare hashed_refresh_token: string;

  // @Column({
  //   type: DataType.STRING,
  // })
  // declare refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  declare active_link: string;

  @HasMany(() => Payment)
  payments: Payment[];

  @HasMany(() => Appointment)
  appointmens: Appointment[];
}
