import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicalrecordsService } from './medicalrecords.service';
import { CreateMedicalrecordDto } from './dto/create-medicalrecord.dto';
import { UpdateMedicalrecordDto } from './dto/update-medicalrecord.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Medicalrecord } from './models/medicalrecord.model';

@ApiTags('Medical Records - Tibbiy yozuvlar')
@Controller('medicalrecords')
export class MedicalrecordsController {
  constructor(private readonly medicalrecordsService: MedicalrecordsService) {}

  @ApiOperation({ summary: 'Yangi tibbiy yozuvni yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Tibbiy yozuv muvaffaqiyatli yaratildi',
    type: Medicalrecord,
  })
  @Post()
  create(@Body() createMedicalrecordDto: CreateMedicalrecordDto) {
    return this.medicalrecordsService.create(createMedicalrecordDto);
  }

  @ApiOperation({ summary: 'Barcha tibbiy yozuvlarni olish' })
  @ApiResponse({
    status: 200,
    description: 'Barcha tibbiy yozuvlar ro‘yxati',
    type: [Medicalrecord],
  })
  @Get()
  findAll() {
    return this.medicalrecordsService.findAll();
  }

  @ApiOperation({ summary: 'Bitta tibbiy yozuvni olish' })
  @ApiResponse({
    status: 200,
    description: 'Tibbiy yozuv muvaffaqiyatli topildi',
    type: Medicalrecord,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalrecordsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Tibbiy yozuvni yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Tibbiy yozuv muvaffaqiyatli yangilandi',
    type: Medicalrecord,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicalrecordDto: UpdateMedicalrecordDto,
  ) {
    return this.medicalrecordsService.update(+id, updateMedicalrecordDto);
  }

  @ApiOperation({ summary: 'Tibbiy yozuvni o‘chirish' })
  @ApiResponse({
    status: 200,
    description: 'Tibbiy yozuv muvaffaqiyatli o‘chirildi',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalrecordsService.remove(+id);
  }
}
