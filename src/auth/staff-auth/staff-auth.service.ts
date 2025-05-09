import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '../dto/sing-in.dto';

import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { StaffsService } from '../../staffs/staffs.service';
import { Staff } from '../../staffs/models/staff.model';
import { CreateStaffDto } from '../../staffs/dto/create-staff.dto';

@Injectable()
export class StaffAuthService {
  constructor(
    private readonly staffService: StaffsService,
    readonly jwtService: JwtService,
  ) {}

  private async generateTokenStaff(staff: Staff) {
    const payload = {
      id: staff.id,
      email: staff.email,
      isActive: staff.is_active,
      password: staff.hashed_password,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  async signUp(createStaffDto: CreateStaffDto) {
    const staff = await this.staffService.findStaffByEmail(
      createStaffDto.email,
    );

    if (staff) {
      throw new ConflictException('Bunday emailli foydalanuvchi mavjud');
    }

    const newStaff = await this.staffService.createStaff(createStaffDto); // ✅
    console.log(newStaff);
    
    return { message: "Foydalanuvchi qo'shildi", staffId: newStaff.id };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const staff = await this.staffService.findStaffByEmail(signInDto.email);
    if (!staff) {
      throw new BadRequestException("Email yoki password noto'g'ri");
    }

    // console.log('Password:', signInDto.password);
    // console.log('Hashed password:', staff);

    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      staff.hashed_password,
    );
    if (!isValidPassword) {
      throw new BadRequestException("Email yoki password noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokenStaff(staff);
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    staff.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await staff.save();
    res.status(200).send({
      message: 'Tizimga xush keleibsiz',
      refreshToken,
    });
  }

  async signOut(refreshToken: string, res: Response) {
    const staffData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!staffData) {
      throw new ForbiddenException('patient not verified');
    }
    const hashed_refresh_token = '';
    await this.staffService.updateRefreshToken(
      staffData.id,
      hashed_refresh_token,
    );

    res.clearCookie('refresh_token');
    const respnose = {
      message: 'staff logged out successfully',
    };
    return respnose;
  }

  async refreshToken(staffId: number, refresh_token: string, res: Response) {
    const decodeToken = await this.jwtService.decode(refresh_token);
    console.log(staffId);
    console.log(decodeToken['id']);

    if (staffId !== decodeToken['id']) {
      throw new ForbiddenException('Ruxsat etilmagan');
    }
    const staff = await this.staffService.findOneStaff(staffId);

    console.log('Hashed token:', staff?.hashed_refresh_token);

    if (!staff || !staff.hashed_refresh_token) {
      throw new NotFoundException('staff not found');
    }

    const tokenMatch = await bcrypt.compare(
      refresh_token,
      staff.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const { accessToken, refreshToken } = await this.generateTokenStaff(staff);

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.staffService.updateRefreshToken(staff.id, hashed_refresh_token);

    res.cookie('refresh_token', refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const respnose = {
      message: 'Staff refreshed',
      patientId: staff.id,
      access_token: accessToken,
    };
    return respnose;
  }
}
