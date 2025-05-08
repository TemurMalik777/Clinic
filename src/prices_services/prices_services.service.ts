import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePricesServiceDto } from './dto/create-prices_service.dto';
import { UpdatePricesServiceDto } from './dto/update-prices_service.dto';
import { PricesService } from './models/prices_service.model';

@Injectable()
export class PricesServicesService {
  constructor(
    @InjectModel(PricesService)
    private readonly pricesServiceModule: typeof PricesService,
  ) {}

  async create(
    createPricesServiceDto: CreatePricesServiceDto,
  ): Promise<PricesService> {
    const pricesService = await this.pricesServiceModule.create(
      createPricesServiceDto,
    );
    return pricesService;
  }

  async findAll(): Promise<PricesService[]> {
    return this.pricesServiceModule.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<PricesService | null> {
    return this.pricesServiceModule.findByPk(id);
  }

  async update(
    id: number,
    updatePricesServiceDto: UpdatePricesServiceDto,
  ): Promise<PricesService | null> {
    const updated = await this.pricesServiceModule.update(
      updatePricesServiceDto,
      {
        where: { id },
        returning: true,
      },
    );

    return updated[1][0];
  }

  async remove(id: number): Promise<string> {
    const deleted = await this.pricesServiceModule.destroy({
      where: { id },
    });

    if (deleted > 0) {
      return "PricesService o'chirildi";
    }
    return 'Bunday PricesService mavjud emas';
  }
}
