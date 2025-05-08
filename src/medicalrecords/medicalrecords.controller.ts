import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalrecordsService } from './medicalrecords.service';
import { CreateMedicalrecordDto } from './dto/create-medicalrecord.dto';
import { UpdateMedicalrecordDto } from './dto/update-medicalrecord.dto';

@Controller('medicalrecords')
export class MedicalrecordsController {
  constructor(private readonly medicalrecordsService: MedicalrecordsService) {}

  @Post()
  create(@Body() createMedicalrecordDto: CreateMedicalrecordDto) {
    return this.medicalrecordsService.create(createMedicalrecordDto);
  }

  @Get()
  findAll() {
    return this.medicalrecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalrecordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalrecordDto: UpdateMedicalrecordDto) {
    return this.medicalrecordsService.update(+id, updateMedicalrecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalrecordsService.remove(+id);
  }
}
