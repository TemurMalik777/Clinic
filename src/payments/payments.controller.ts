import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { link } from 'fs';

@ApiTags('Payments-Tovllar')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi payment yaratish' })
  @ApiResponse({ status: 201, description: 'Payment yaratildi' })
  @ApiBody({ type: CreatePaymentDto })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha paymentlarni olish' })
  @ApiResponse({ status: 200, description: 'Paymentlar roʻyxati' })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha paymentni olish' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Topilgan payment' })
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Paymentni yangilash' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdatePaymentDto })
  @ApiResponse({ status: 200, description: 'Payment yangilandi' })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Paymentni o‘chirish' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Payment o‘chirildi' })
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
