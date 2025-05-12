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
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Staff } from './models/staff.model';
import { AuthGuard } from '../common/guard/auth.guard';
import { AdminGuard } from '../common/guard/admin.guard';
import { StaffGuard } from '../common/guard/staff.guard';
import { SelfStaffGuard } from '../common/guard/selfstaff.guard';

@ApiTags('Staffs - Hodimlar')
@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @ApiOperation({ summary: 'Yangi hodim yaratish' })
  @ApiResponse({ status: 201, description: 'Yaratilgan hodim', type: Staff })
  @UseGuards(AuthGuard, AdminGuard)
  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.createStaff(createStaffDto);
  }

  @ApiOperation({ summary: 'Barcha hodimlarni olish' })
  @ApiResponse({ status: 200, description: 'Hodimlar ro‘yxati', type: [Staff] })
  @UseGuards(AuthGuard, AdminGuard)
  @Get()
  findAll() {
    return this.staffsService.findAllStaff();
  }

  @ApiOperation({ summary: 'ID bo‘yicha hodimni olish' })
  @ApiResponse({ status: 200, description: 'Topilgan hodim', type: Staff })
  @Get(':id')
  @UseGuards(AuthGuard, StaffGuard, SelfStaffGuard)
  findOne(@Param('id') id: string) {
    return this.staffsService.findOneStaff(+id);
  }

  @ApiOperation({ summary: 'Hodim maʼlumotlarini yangilash' })
  @ApiResponse({ status: 200, description: 'Yangilangan hodim', type: Staff })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffsService.updateStaff(+id, updateStaffDto);
  }

  @ApiOperation({ summary: 'Hodimni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Hodim o‘chirildi' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffsService.remove(+id);
  }
}
