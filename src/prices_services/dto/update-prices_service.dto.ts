import { PartialType } from '@nestjs/mapped-types';
import { CreatePricesServiceDto } from './create-prices_service.dto';

export class UpdatePricesServiceDto extends PartialType(CreatePricesServiceDto) {}
