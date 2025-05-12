import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Patient } from './models/patient.model';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthGuard } from '../common/guard/auth.guard';
import { RolesGuard } from '../common/guard/RolesGuard.guard';
import { PatientGuard } from '../common/guard/patients.guard';
import { SelfPatientGuard } from '../common/guard/selfpatients.guard';
import { AdminGuard } from '../common/guard/admin.guard';

@ApiTags('Patients - bemorlar')
@Controller('patients')
// @UseGuards(AuthGuard, RolesGuard)
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @ApiOperation({ summary: "Foydalanuvchi qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'Create user',
    type: Patient,
  })
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @ApiOperation({ summary: 'Barcha foydalnuvchilarni olish' })
  @ApiResponse({
    status: 200,
    description: 'Lest of users',
    type: [Patient],
  })
  @Get()
  @UseGuards(AuthGuard, AdminGuard)
  findAll() {
    return this.patientsService.findAll();
  }

  @Get("activate/:link")
  @ApiOperation({ summary: "Bemor profilini faollashtirish" })
  @ApiResponse({
    status: 200,
    description: "Faollashtirish muvaffaqiyatli yakunlandi",
  })
  @ApiResponse({
    status: 400,
    description: "Faollashtirish linki yaroqsiz yoki muddati tugagan",
  })
  activate(@Param("link") link: string) {
    return this.patientsService.activate(link);
  }

  @Get(':id')
  @UseGuards(AuthGuard, PatientGuard, SelfPatientGuard)
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, PatientGuard, SelfPatientGuard)
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, PatientGuard, SelfPatientGuard)
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }

  // patients.controller.ts
  @Patch(':id/password')
  @UseGuards(AuthGuard, PatientGuard, SelfPatientGuard)
  updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.patientsService.updatePatientsPassword(id, updatePasswordDto);
  }
  @Get('qidiruv')
  async qidiruv(
    @Query() query: { name?: string; email?: string; phone_number?: string },
  ) {
    return this.patientsService.aqlliQidiruv(query);
  }
}
