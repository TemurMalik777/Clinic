import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'clinics' })
export class Clinic extends Model<Clinic> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  rating: number;
}
