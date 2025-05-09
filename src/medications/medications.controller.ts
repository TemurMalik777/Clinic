import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Medication } from './models/medication.model';

@ApiTags('Medications - Dori vositalari')
@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @ApiOperation({ summary: 'Dori vositasini yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Dori vositasi yaratildi',
    type: Medication
  })
  @Post()
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationsService.create(createMedicationDto);
  }

  @ApiOperation({ summary: 'Barcha dori vositalarini olish' })
  @ApiResponse({
    status: 200,
    description: 'Barcha dori vositalari',
    type: [Medication],
  })
  @Get()
  findAll() {
    return this.medicationsService.findAll();
  }

  @ApiOperation({ summary: 'ID bo\'yicha dori vositasini olish' })
  @ApiResponse({
    status: 200,
    description: 'Dori vositasi topildi',
    type: Medication,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicationsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Dori vositasini yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Dori vositasi yangilandi',
    type: Medication,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicationDto: UpdateMedicationDto) {
    return this.medicationsService.update(+id, updateMedicationDto);
  }

  @ApiOperation({ summary: 'Dori vositasini o\'chirish' })
  @ApiResponse({
    status: 200,
    description: 'Dori vositasi o\'chirildi',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicationsService.remove(+id);
  }
}
