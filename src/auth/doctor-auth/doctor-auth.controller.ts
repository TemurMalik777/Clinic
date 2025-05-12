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
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { SignInDto } from '../dto/sing-in.dto';
import { Response } from 'express';
import { CookieGetter } from '../../common/decorators/cookie-getter.decorator';
import { CreateDoctorDto } from '../../doctors/dto/create-doctor.dto';
import { DocAuthService } from './doctor-auth.service';
import { AuthGuard } from '../../common/guard/auth.guard';
import { AdminGuard } from '../../common/guard/admin.guard';
import { SelfAdminGuard } from '../../common/guard/selfadmin.guard';
import { DoctorGuard } from '../../common/guard/doctor.guard';

@ApiTags('Doctor Authentication')
@Controller('auth-doctor')
export class DocAuthController {
  constructor(private readonly docauthService: DocAuthService) {}

  @ApiOperation({ summary: 'Doctor ro‘yxatdan o‘tadi (Sign-Up)' })
  @ApiResponse({ status: 201, description: 'Doctor muvaffaqiyatli yaratildi' })
  @ApiBody({ type: CreateDoctorDto })
  @UseGuards(AuthGuard, AdminGuard)
  @Post('sign-up')
  signUp(@Body() createDoctorDto: CreateDoctorDto) {
    return this.docauthService.signUp(createDoctorDto);
  }

  @ApiOperation({ summary: 'Doctor login qiladi (Sign-In)' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli login' })
  @ApiBody({ type: SignInDto })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async singIn(
    @Body() singInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.docauthService.signIn(singInDto, res);
  }

  @ApiOperation({ summary: 'Doctor logout qiladi (Sign-Out)' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli chiqdi' })
  @ApiCookieAuth()
  @Get('sign-out')
  singout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.docauthService.signOut(refreshToken, res);
  }

  @ApiOperation({ summary: 'Doctor tokenni yangilaydi (Refresh Token)' })
  @ApiResponse({ status: 200, description: 'Token muvaffaqiyatli yangilandi' })
  @ApiParam({ name: 'id', type: Number, description: 'Doctor IDsi' })
  @ApiCookieAuth()
  @HttpCode(200)
  @Post(':id/refresh')
  refresh(
    @Param('id', ParseIntPipe) id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.docauthService.refreshToken(id, refreshToken, res);
  }
}
