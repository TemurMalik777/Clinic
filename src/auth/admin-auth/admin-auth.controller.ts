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
import { AdminAuthService } from './admin-auth.service';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { AuthGuard } from '../../common/guard/auth.guard';
import { AdminGuard } from '../../common/guard/admin.guard';
import { SelfAdminGuard } from '../../common/guard/selfadmin.guard';

@ApiTags('Admin Authentication')
@Controller('auth-admin')
export class AdminAuthController {
  constructor(private readonly adminService: AdminAuthService) {}

  @ApiOperation({ summary: 'Adminni ro‘yxatdan o‘tkazish' })
  @ApiResponse({ status: 201, description: 'Admin muvaffaqiyatli yaratildi' })
  @UseGuards(AuthGuard, AdminGuard, SelfAdminGuard)
  @Post('sign-up')
  signUp(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.signUp(createAdminDto);
  }

  @ApiOperation({ summary: 'Adminni tizimga kiritish (login)' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli login' })
  @ApiBody({ type: SignInDto })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async singIn(
    @Body() singInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signIn(singInDto, res);
  }

  @ApiOperation({ summary: 'Adminni tizimdan chiqarish (logout)' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli logout' })
  @ApiCookieAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @Get('sign-out')
  singout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signOut(refreshToken, res);
  }

  @ApiOperation({ summary: 'Tokenni yangilash (refresh token)' })
  @ApiResponse({
    status: 200,
    description: 'Yangilangan access va refresh tokenlar',
  })
  @ApiParam({ name: 'id', type: Number, description: 'Admin IDsi' })
  @ApiCookieAuth()
  @HttpCode(200)
  @Post(':id/refresh')
  refresh(
    @Param('id', ParseIntPipe) id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(id, refreshToken, res);
  }
}
