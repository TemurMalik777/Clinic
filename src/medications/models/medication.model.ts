import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IMedicationsCreationAttr {
  name: string;
  dosage: string;
  description: string;
}

@Table({ tableName: 'medications' })
export class Medication extends Model<Medication, IMedicationsCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare dosage: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare description: string;
}
