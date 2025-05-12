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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreatePatientDto } from '../../patients/dto/create-patient.dto';
import { SignInDto } from '../dto/sing-in.dto';
import { Response } from 'express';
import { CookieGetter } from '../../common/decorators/cookie-getter.decorator';

@ApiTags('Patient Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Patient ro‘yxatdan o‘tadi (Sign-Up)' })
  @ApiResponse({ status: 201, description: 'Patient muvaffaqiyatli yaratildi' })
  @ApiBody({ type: CreatePatientDto })
  @Post('sign-up')
  signUp(@Body() createPatientsDto: CreatePatientDto) {
    return this.authService.signUp(createPatientsDto);
  }

  @ApiOperation({ summary: 'Patient login qiladi (Sign-In)' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli login' })
  @ApiBody({ type: SignInDto })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async singIn(
    @Body() singInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signIn(singInDto, res);
  }

  @ApiOperation({ summary: 'Patient logout qiladi (Sign-Out)' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli chiqdi' })
  @ApiCookieAuth()
  @Get('sign-out')
  singout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signOut(refreshToken, res);
  }

  @ApiOperation({ summary: 'Tokenni yangilaydi (Refresh Token)' })
  @ApiResponse({ status: 200, description: 'Token muvaffaqiyatli yangilandi' })
  @ApiParam({ name: 'id', type: Number, description: 'Patient IDsi' })
  @ApiCookieAuth()
  @HttpCode(200)
  @Post(':id/refresh')
  refresh(
    @Param('id', ParseIntPipe) id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
