import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentMethod } from './models/payment_method.model';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectModel(PaymentMethod)
    private readonly paymentMethodModule: typeof PaymentMethod,
  ) {}

  async create(
    createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodModule.create(
      createPaymentMethodDto,
    );
    return paymentMethod;
  }

  async findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodModule.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<PaymentMethod | null> {
    return this.paymentMethodModule.findByPk(id);
  }

  async update(
    id: number,
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod | null> {
    const updated = await this.paymentMethodModule.update(
      updatePaymentMethodDto,
      {
        where: { id },
        returning: true,
      },
    );

    return updated[1][0]; // [affectedCount, affectedRows]
  }

  async remove(id: number): Promise<string> {
    const deleted = await this.paymentMethodModule.destroy({
      where: { id },
    });

    if (deleted > 0) {
      return "To'lov usuli o'chirildi";
    }
    return "Bunday to'lov usuli mavjud emas";
  }
}
