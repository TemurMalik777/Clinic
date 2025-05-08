import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from 'sequelize-typescript';

interface IMedicalrecordsCreationAttr {
  appointment_id: number;
  record_data: string;
  treatment: string;
  diagnosis: string;
}

@Table({ tableName: 'medicalrecords' })
export class Medicalrecord extends Model<
  Medicalrecord,
  IMedicalrecordsCreationAttr
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
  declare appointment_id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare record_data: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare treatment: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare diagnosis: string;
}
