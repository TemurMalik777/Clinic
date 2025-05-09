import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PricesServicesService } from './prices_services.service';
import { CreatePricesServiceDto } from './dto/create-prices_service.dto';
import { UpdatePricesServiceDto } from './dto/update-prices_service.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Prices Services -Tolov xizmatlari')
@Controller('prices-services')
export class PricesServicesController {
  constructor(private readonly pricesServicesService: PricesServicesService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi price service qo‘shish' })
  @ApiResponse({ status: 201, description: 'Price service yaratildi' })
  @ApiBody({ type: CreatePricesServiceDto })
  create(@Body() createPricesServiceDto: CreatePricesServiceDto) {
    return this.pricesServicesService.create(createPricesServiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha price service larni olish' })
  @ApiResponse({ status: 200, description: 'Price service lar ro‘yxati' })
  findAll() {
    return this.pricesServicesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha price service ni olish' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Topilgan price service' })
  findOne(@Param('id') id: string) {
    return this.pricesServicesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Price service ni yangilash' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdatePricesServiceDto })
  @ApiResponse({ status: 200, description: 'Price service yangilandi' })
  update(
    @Param('id') id: string,
    @Body() updatePricesServiceDto: UpdatePricesServiceDto,
  ) {
    return this.pricesServicesService.update(+id, updatePricesServiceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Price service ni o‘chirish' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Price service o‘chirildi' })
  remove(@Param('id') id: string) {
    return this.pricesServicesService.remove(+id);
  }
}
