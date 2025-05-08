import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Patient } from '../../patients/models/patient.model';

interface ILabtestCreationAttr {
  patient_id: number;
  test_name: string;
  test_date: string;
  result_patient: string;
}

@Table({ tableName: 'labtest' })
export class LabTest extends Model<LabTest, ILabtestCreationAttr> {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare test_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare test_date: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare result_patient: string;
}
