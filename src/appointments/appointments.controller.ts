import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { Appointment } from './models/appointment.model';
import { AuthGuard } from '../common/guard/auth.guard';
import { DoctorGuard } from '../common/guard/doctor.guard';

@ApiTags('Appointments - Uchrashuvlar')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @ApiOperation({ summary: 'Uchrashuv yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Yangi appointment yaratildi',
    type: Appointment,
  })
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @ApiOperation({ summary: 'Barcha uchrashuvlarni olish' })
  @ApiResponse({
    status: 200,
    description: 'Appointmentlar ro‘yxati',
    type: [Appointment],
  })
  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @ApiOperation({ summary: 'ID orqali appointmentni olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Appointment ID' })
  @ApiResponse({
    status: 200,
    description: 'Topilgan appointment',
    type: Appointment,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Appointmentni yangilash' })
  @ApiParam({ name: 'id', type: Number, description: 'Appointment ID' })
  @ApiResponse({
    status: 200,
    description: 'Appointment muvaffaqiyatli yangilandi',
    type: Appointment,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @ApiOperation({ summary: 'Appointmentni o‘chirish' })
  @ApiParam({ name: 'id', type: Number, description: 'Appointment ID' })
  @ApiResponse({
    status: 200,
    description: 'Appointment o‘chirildi',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }

  // @ApiOperation({ summary: 'Doctor o‘ziga tegishli appointmentlarni ko‘rish' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Doctor appointmentlari',
  //   type: [Appointment],
  // })
  // @UseGuards(AuthGuard, DoctorGuard)
  // @Get('my-appointments')
  // async findMyAppointments(@Req() req) {
  //   const doctorId = req.user.id;

  //   // doctorId ning to‘g‘ri raqam ekanligini tekshiramiz
  //   if (isNaN(doctorId) || !doctorId) {
  //     throw new BadRequestException('Noto‘g‘ri doctor ID');
  //   }

  //   return this.appointmentsService.findByDoctorId(doctorId);
  // }
}
