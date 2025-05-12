import { Controller, Get, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';

@Controller('users')
export class UserController {
  constructor(private readonly patientService: PatientsService) {}

  @Get('qidiruv')
  async qidiruv(
    @Query() query: { name?: string; email?: string; phone_number?: string },
  ) {
    return this.patientService.aqlliQidiruv(query);
  }
}
