import { Model, Table, Column, DataType } from 'sequelize-typescript';

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

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare patient_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare doctor_id: number;

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
}
