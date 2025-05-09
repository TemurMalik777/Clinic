import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Doctor } from '../../doctors/models/doctor.model';

interface ISpecializationCreationAttr {
  name: string;
  description: string;
}

@Table({ tableName: 'specializations' })
export class Specialization extends Model<
  Specialization,
  ISpecializationCreationAttr
> {
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
  declare description: string;

  @HasMany(()=>Doctor)
  doctor: Doctor[]
}
