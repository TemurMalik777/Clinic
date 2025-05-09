import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentMethodsService } from './payment_methods.service';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Payment Methods - Tolov Usullari')
@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Post()
  @ApiOperation({ summary: 'To‘lov usulini yaratish' })
  @ApiResponse({ status: 201, description: 'Yaratilgan to‘lov usuli' })
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodsService.create(createPaymentMethodDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha to‘lov usullarini olish' })
  @ApiResponse({ status: 200, description: 'To‘lov usullari ro‘yxati' })
  findAll() {
    return this.paymentMethodsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha to‘lov usulini olish' })
  @ApiResponse({ status: 200, description: 'Topilgan to‘lov usuli' })
  @ApiResponse({ status: 404, description: 'To‘lov usuli topilmadi' })
  findOne(@Param('id') id: string) {
    return this.paymentMethodsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID bo‘yicha to‘lov usulini yangilash' })
  @ApiResponse({ status: 200, description: 'Yangilangan to‘lov usuli' })
  @ApiResponse({ status: 404, description: 'To‘lov usuli topilmadi' })
  update(
    @Param('id') id: string,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {
    return this.paymentMethodsService.update(+id, updatePaymentMethodDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID bo‘yicha to‘lov usulini o‘chirish' })
  @ApiResponse({ status: 200, description: 'O‘chirilgan to‘lov usuli' })
  @ApiResponse({ status: 404, description: 'To‘lov usuli topilmadi' })
  remove(@Param('id') id: string) {
    return this.paymentMethodsService.remove(+id);
  }
}
