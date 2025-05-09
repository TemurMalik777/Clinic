import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Patient } from '../../patients/models/patient.model';
import { Doctor } from '../../doctors/models/doctor.model';
import { Medicalrecord } from '../../medicalrecords/models/medicalrecord.model';

interface IAppointmentsCreationAttr {
  patient_id: number;
  doctor_id: number;
  appointment_time: number;
  status: string;
  scheduled_time: number;
  reason: number;
}

@Table({ tableName: 'appointments' })
export class Appointment extends Model<Appointment, IAppointmentsCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare patient_id: number;

  @BelongsTo(() => Patient)
  patient: Patient; 

  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare doctor_id: number;
  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare appointment_time: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare status: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare scheduled_time: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare reason: number;

  @HasMany(() => Medicalrecord)
  medicalrecord: Medicalrecord[];
}
