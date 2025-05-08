import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IDoctorsCreationAttr {
  full_name: string;
  username: string;
  email: string;
  phone_number: string;
  password: string;
  academic_degre: string;
  apec_id: number;
  gender: 'male' | 'female';
  experience_years: number;
  status: 'active' | 'inactive';
  is_active: string;
}

@Table({ tableName: 'doctors' })
export class Doctor extends Model<Doctor, IDoctorsCreationAttr> {
  @Column({
    type: DataType.STRING,
  })
  declare full_name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
  })
  declare academic_degre: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare apec_id: number;

  @Column({
    type: DataType.ENUM('male', 'female'),
  })
  declare gender: 'male' | 'female';

  @Column({
    type: DataType.INTEGER,
  })
  declare experience_years: number;

  @Column({
    type: DataType.ENUM('active', 'inactive', 'suspended'),
  })
  declare status: string;

  @Column({
    type: DataType.STRING,
  })
  declare profile_image_url: string;

  @Column({
    type: DataType.STRING,
  })
  declare is_active: string;

  @Column({
    type: DataType.STRING,
  })
  declare refresh_token: string;
}
