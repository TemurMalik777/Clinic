import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LabTestsService } from './lab_tests.service';
import { CreateLabTestDto } from './dto/create-lab_test.dto';
import { UpdateLabTestDto } from './dto/update-lab_test.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LabTest } from './models/lab_test.model';

@ApiTags('Lab Tests - Laboratoriya testlari')
@Controller('lab-tests')
export class LabTestsController {
  constructor(private readonly labTestsService: LabTestsService) {}

  @ApiOperation({ summary: 'Yangi laboratoriya testini yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Laboratoriya testi muvaffaqiyatli yaratildi',
    type: LabTest,
  })
  @Post()
  create(@Body() createLabTestDto: CreateLabTestDto) {
    return this.labTestsService.create(createLabTestDto);
  }

  @ApiOperation({ summary: 'Barcha laboratoriya testlarini olish' })
  @ApiResponse({
    status: 200,
    description: 'Barcha laboratoriya testlari ro‘yxati',
    type: [LabTest],
  })
  @Get()
  findAll() {
    return this.labTestsService.findAll();
  }

  @ApiOperation({ summary: 'Laboratoriya testini ID bo‘yicha olish' })
  @ApiResponse({
    status: 200,
    description: 'Laboratoriya testi muvaffaqiyatli topildi',
    type: LabTest,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labTestsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Laboratoriya testini yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Laboratoriya testi muvaffaqiyatli yangilandi',
    type: LabTest,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLabTestDto: UpdateLabTestDto) {
    return this.labTestsService.update(+id, updateLabTestDto);
  }

  @ApiOperation({ summary: 'Laboratoriya testini o‘chirish' })
  @ApiResponse({
    status: 200,
    description: 'Laboratoriya testi muvaffaqiyatli o‘chirildi',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labTestsService.remove(+id);
  }
}
