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
import { PricesService } from '../../prices_services/models/prices_service.model';

interface IPaymentsCreationAttr {
  patient_id: number;
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
    allowNull: false,
  })
  declare patient_id: number;
  @BelongsTo(() => Patient)
  patient: Patient;

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

  // @HasMany(() => PricesService)
  // pricesService: PricesService[];
}
