import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PricesServicesService } from './prices_services.service';
import { CreatePricesServiceDto } from './dto/create-prices_service.dto';
import { UpdatePricesServiceDto } from './dto/update-prices_service.dto';

@Controller('prices-services')
export class PricesServicesController {
  constructor(private readonly pricesServicesService: PricesServicesService) {}

  @Post()
  create(@Body() createPricesServiceDto: CreatePricesServiceDto) {
    return this.pricesServicesService.create(createPricesServiceDto);
  }

  @Get()
  findAll() {
    return this.pricesServicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pricesServicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePricesServiceDto: UpdatePricesServiceDto) {
    return this.pricesServicesService.update(+id, updatePricesServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricesServicesService.remove(+id);
  }
}
