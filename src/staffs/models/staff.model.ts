import { Column, DataType, Model, Table } from 'sequelize-typescript';

type Role = 'vrach' | 'felsher' | 'manager';

interface IStaffsCreationAttr {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  phone_number: string;
  role: Role;
}

@Table({ tableName: 'staffs' })
export class Staff extends Model<Staff, IStaffsCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare first_name: string;

  @Column({ type: DataType.STRING })
  declare last_name: string;

  @Column({ type: DataType.STRING })
  declare username: string;

  @Column({ type: DataType.STRING })
  declare email: string;

  @Column({ type: DataType.STRING })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare refresh_token: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare phone_number: string;

  @Column({
    type: DataType.ENUM('vrach', 'felsher', 'manager'),
  })
  declare role: Role;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare is_active: boolean;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare active_link: string;
}
