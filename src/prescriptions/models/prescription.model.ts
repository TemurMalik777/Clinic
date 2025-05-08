import { Column, DataType, Model, Table } from 'sequelize-typescript';

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

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare doctor_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare patient_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare medication_id: number;

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
