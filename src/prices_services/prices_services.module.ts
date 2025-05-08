import { Module } from '@nestjs/common';
import { PricesServicesService } from './prices_services.service';
import { PricesServicesController } from './prices_services.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PricesService } from './models/prices_service.model';

@Module({
  imports: [SequelizeModule.forFeature([PricesService])],
  controllers: [PricesServicesController],
  providers: [PricesServicesService],
})
export class PricesServicesModule {}
