import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.createStaff(createStaffDto);
  }

  @Get()
  findAll() {
    return this.staffsService.findAllStaff();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffsService.findOneStaff(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffsService.updateStaff(+id, updateStaffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffsService.remove(+id);
  }
}
