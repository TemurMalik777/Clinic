import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.models';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment) private readonly paymentModule: typeof Payment,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = await this.paymentModule.create(createPaymentDto);
    return payment;
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModule.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Payment | null> {
    return this.paymentModule.findByPk(id);
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment | null> {
    const updated = await this.paymentModule.update(updatePaymentDto, {
      where: { id },
      returning: true,
    });

    return updated[1][0];
  }

  async remove(id: number): Promise<string> {
    const deleted = await this.paymentModule.destroy({
      where: { id },
    });

    if (deleted > 0) {
      return "Payment o'chirildi";
    }
    return 'Bunday Payment mavjud emas';
  }
}
