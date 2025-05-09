import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Doctor } from './models/doctor.model';

@ApiTags('Doctors - Shifokorlar')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @ApiOperation({ summary: 'Yangi shifokor qoʻshish' })
  @ApiResponse({
    status: 201,
    description: 'Shifokor muvaffaqiyatli yaratildi',
    type: Doctor,
  })
  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @ApiOperation({ summary: 'Barcha shifokorlarni olish' })
  @ApiResponse({
    status: 200,
    description: 'Shifokorlar roʻyxati',
    type: [Doctor],
  })
  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @ApiOperation({ summary: 'Bitta shifokorni ID orqali olish' })
  @ApiResponse({ status: 200, description: 'Topilgan shifokor', type: Doctor })
  @ApiResponse({ status: 404, description: 'Shifokor topilmadi' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Shifokor maʼlumotlarini yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Shifokor yangilandi',
    type: Doctor,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @ApiOperation({ summary: 'Shifokorni oʻchirish' })
  @ApiResponse({ status: 200, description: 'Shifokor oʻchirildi' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(+id);
  }
}
