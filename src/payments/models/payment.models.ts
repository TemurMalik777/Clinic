import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Patient } from '../../patients/models/patient.model';

interface IPaymentsCreationAttr {
  patient_id_pay: number;
  amount: number;
  payments_date: number;
  payments_method: number;
  status: string;
}

@Table({ tableName: 'payments' })
export class Payment extends Model<Payment, IPaymentsCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
  })
  declare patient_id: number;


  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare amount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare payments_date: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare payments_method: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare status: string;

  // @HasMany(()=>PricesService)
  // prices_servicesss: PricesService[]

  
  // @BelongsTo(() => Patient) // 'own' emas, 'patient' deb nomlang
  // patient: Patient;
}
