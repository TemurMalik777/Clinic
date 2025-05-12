import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Doctor } from './models/doctor.model';
import { AdminGuard } from '../common/guard/admin.guard';
import { SelfAdminGuard } from '../common/guard/selfadmin.guard';
import { AuthGuard } from '../common/guard/auth.guard';
import { DoctorGuard } from '../common/guard/doctor.guard';
import { SelfDoctorGuard } from '../common/guard/selfdoctor.guard';

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
  @UseGuards(AuthGuard, AdminGuard)
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
  @UseGuards(AuthGuard, AdminGuard)
  findAll() {
    return this.doctorsService.findAll();
  }

  @ApiOperation({ summary: 'Bitta shifokorni ID orqali olish' })
  @ApiResponse({ status: 200, description: 'Topilgan shifokor', type: Doctor })
  @ApiResponse({ status: 404, description: 'Shifokor topilmadi' })
  @UseGuards(AuthGuard, DoctorGuard, SelfDoctorGuard)
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
  @UseGuards(AuthGuard, DoctorGuard, SelfDoctorGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @ApiOperation({ summary: 'Shifokorni oʻchirish' })
  @ApiResponse({ status: 200, description: 'Shifokor oʻchirildi' })
  @Delete(':id')
  @UseGuards(AuthGuard, DoctorGuard, SelfDoctorGuard)
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(+id);
  }

  @ApiOperation({ summary: 'Shifokorning parolini yangilash' })
  @ApiResponse({ status: 200, description: 'Parol muvaffaqiyatli yangilandi' })
  @ApiResponse({ status: 400, description: 'Eski parol noto‘g‘ri' })
  @ApiResponse({ status: 404, description: 'Shifokor topilmadi' })
  @ApiBody({
    description: 'Eski va yangi parollarni kiriting',
    schema: {
      type: 'object',
      properties: {
        oldPassword: {
          type: 'string',
          example: 'oldPassword123',
        },
        newPassword: {
          type: 'string',
          example: 'newPassword456',
        },
      },
    },
  })
  // @UseGuards(AuthGuard, DoctorGuard, SelfDoctorGuard)
  @Post(':id/update-password')
  updatePassword(
    @Param('id') id: string,
    @Body() dto: { oldPassword: string; newPassword: string },
  ) {
    return this.doctorsService.updateDoctorsPassword(+id, dto);
  }
}
