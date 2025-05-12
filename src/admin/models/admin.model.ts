import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IAdminCreationAttr {
  username: string;
  email: string;
  phone_number: string;
  hashed_password: string
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare phone_number: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare hashed_password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare hashed_refresh_token: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  declare is_creater: boolean

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  declare is_active: boolean;
}
