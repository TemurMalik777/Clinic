import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Medication } from '../../medications/models/medication.model';
import { Patient } from '../../patients/models/patient.model';
import { Doctor } from '../../doctors/models/doctor.model';

interface IPrescriptionsCreationAttr {
  doctor_id: number;
  patient_id: number;
  medication_id: number;
  dosage: string;
  prescription_date: string;
  frequency: string;
  instructions: string;
}

@Table({ tableName: 'prescriptions' })
export class Prescription extends Model<
  Prescription,
  IPrescriptionsCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare doctor_id: number;
  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare patient_id: number;
  
  @BelongsTo(() => Patient)
  patient: Patient;

  @ForeignKey(() => Medication)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare medication_id: number;
  @BelongsTo(() => Medication)
  medication: Medication;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare dosage: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare prescription_date: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare frequency: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare instructions: string;
}
