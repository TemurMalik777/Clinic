import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Prescriptions - Retseptlar')
@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post()
  @ApiOperation({ summary: 'Retsepti yaratish' })
  @ApiResponse({ status: 201, description: 'Yaratilgan retsept' })
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionsService.create(createPrescriptionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha retseptlarni olish' })
  @ApiResponse({ status: 200, description: 'Retseptlar ro‘yxati' })
  findAll() {
    return this.prescriptionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha retseptni olish' })
  @ApiResponse({ status: 200, description: 'Topilgan retsept' })
  @ApiResponse({ status: 404, description: 'Retsept topilmadi' })
  findOne(@Param('id') id: string) {
    return this.prescriptionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID bo‘yicha retseptni yangilash' })
  @ApiResponse({ status: 200, description: 'Yangilangan retsept' })
  @ApiResponse({ status: 404, description: 'Retsept topilmadi' })
  update(@Param('id') id: string, @Body() updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prescriptionsService.update(+id, updatePrescriptionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID bo‘yicha retseptni o‘chirish' })
  @ApiResponse({ status: 200, description: 'O‘chirilgan retsept' })
  @ApiResponse({ status: 404, description: 'Retsept topilmadi' })
  remove(@Param('id') id: string) {
    return this.prescriptionsService.remove(+id);
  }
}
