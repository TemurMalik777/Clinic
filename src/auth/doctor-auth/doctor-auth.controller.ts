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
import { CreateDoctorDto } from '../../doctors/dto/create-doctor.dto';
import { DocAuthService } from './doctor-auth.service';

@Controller('auth-doctor')
export class DocAuthController {
  constructor(private readonly docauthService: DocAuthService) {}

  @Post('sign-up')
  signUp(@Body() createDoctorDto: CreateDoctorDto) {
    return this.docauthService.signUp(createDoctorDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async singIn(
    @Body() singInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.docauthService.signIn(singInDto, res);
  }

  @Get('sign-out')
  singout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true })
    res: Response,
  ) {
    return this.docauthService.signOut(refreshToken, res);
  }

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
