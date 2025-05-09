import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Payment } from '../../payments/models/payment.models';

interface IPriceCreationAttr {
  name: string;
  description: string;
  price: number;
  payment_id: number;
}

@Table({ tableName: 'pricesservice' })
export class PricesService extends Model<PricesService, IPriceCreationAttr> {
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

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  declare price: number;

  @ForeignKey(()=>Payment)
  @Column({
    type: DataType.INTEGER,
  })
  declare payment_id: number;

  @BelongsTo(()=>Payment)
  payment2: Payment
}
