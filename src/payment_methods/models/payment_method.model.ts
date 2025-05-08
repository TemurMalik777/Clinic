import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IPaymentsMethodCreationAttr {
  name: string;
  description: string;
}

@Table({ tableName: 'payment_methods' })
export class PaymentMethod extends Model<
  PaymentMethod,
  IPaymentsMethodCreationAttr
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
}
