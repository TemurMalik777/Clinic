import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { SignInDto } from '../dto/sing-in.dto';
import { Response } from 'express';
import { CookieGetter } from '../../common/decorators/cookie-getter.decorator';
import { CreateStaffDto } from '../../staffs/dto/create-staff.dto';
import { StaffAuthService } from './staff-auth.service';

@Controller('auth-staff')
export class StaffAuthController {
  constructor(private readonly staffService: StaffAuthService) {}

  @Post('sign-up')
  signUp(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.signUp(createStaffDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async singIn(
    @Body() singInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.staffService.signIn(singInDto, res);
  }

  @Get('sign-out')
  singout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true })
    res: Response,
  ) {
    return this.staffService.signOut(refreshToken, res);
  }

  @HttpCode(200)
  @Post(':id/refresh')
  refresh(
    @Param('id', ParseIntPipe) id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.staffService.refreshToken(id, refreshToken, res);
  }
}
