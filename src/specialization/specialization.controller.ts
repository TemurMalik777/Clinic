import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Specialization-mutaxasisligi')
@Controller('specialization')
export class SpecializationController {
  constructor(private readonly specializationService: SpecializationService) {}

  @Post()
  @ApiOperation({ summary: 'Specializatsiyani yaratish' })
  @ApiResponse({ status: 201, description: 'Yaratilgan specializatsiya' })
  create(@Body() createSpecializationDto: CreateSpecializationDto) {
    return this.specializationService.create(createSpecializationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha specializatsiyalarni olish' })
  @ApiResponse({ status: 200, description: 'Specializatsiyalar ro‘yxati' })
  findAll() {
    return this.specializationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha specializatsiyani olish' })
  @ApiResponse({ status: 200, description: 'Topilgan specializatsiya' })
  @ApiResponse({ status: 404, description: 'Specializatsiya topilmadi' })
  findOne(@Param('id') id: string) {
    return this.specializationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID bo‘yicha specializatsiyani yangilash' })
  @ApiResponse({ status: 200, description: 'Yangilangan specializatsiya' })
  @ApiResponse({ status: 404, description: 'Specializatsiya topilmadi' })
  update(
    @Param('id') id: string,
    @Body() updateSpecializationDto: UpdateSpecializationDto,
  ) {
    return this.specializationService.update(+id, updateSpecializationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID bo‘yicha specializatsiyani o‘chirish' })
  @ApiResponse({ status: 200, description: 'O‘chirilgan specializatsiya' })
  @ApiResponse({ status: 404, description: 'Specializatsiya topilmadi' })
  remove(@Param('id') id: string) {
    return this.specializationService.remove(+id);
  }
}
