import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DoctorsService } from '../../doctors/doctors.service';
import { JwtService } from '@nestjs/jwt';
import { Doctor } from '../../doctors/models/doctor.model';
import { CreateDoctorDto } from '../../doctors/dto/create-doctor.dto';
import { SignInDto } from '../dto/sing-in.dto';

import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DocAuthService {
  constructor(
    private readonly doctorService: DoctorsService,
    readonly jwtService: JwtService,
  ) {}

  private async generateTokenDoctor(doctor: Doctor) {
    const payload = {
      id: doctor.id,
      email: doctor.email,
      isActive: doctor.is_active,
      role: doctor.role,
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
  async signUp(createDoctorDto: CreateDoctorDto) {
    const doctor = await this.doctorService.findDoctorByEmail(
      createDoctorDto.email,
    );

    if (doctor) {
      throw new ConflictException('Bunday emailli foydalanuvchi mavjud');
    }

    const newDoctor = await this.doctorService.create(createDoctorDto); // ✅
    return { message: "Foydalanuvchi qo'shildi", doctor_id: newDoctor.id };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const doctor = await this.doctorService.findDoctorByEmail(signInDto.email);
    if (!doctor) {
      throw new BadRequestException("Email yoki password noto'g'ri");
    }

    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      doctor.hashed_password,
    );
    if (!isValidPassword) {
      throw new BadRequestException("Email yoki password noto'g'ri");
    }

    const { accessToken, refreshToken } =
      await this.generateTokenDoctor(doctor);
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    doctor.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await doctor.save();
    res.status(200).send({
      message: 'Tizimga xush keleibsiz',
      refreshToken,
    });
  }

  async signOut(refreshToken: string, res: Response) {
    const doctorData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!doctorData) {
      throw new ForbiddenException('patient not verified');
    }
    const hashed_refresh_token = '';
    await this.doctorService.updateRefreshToken(
      doctorData.id,
      hashed_refresh_token,
    );

    res.clearCookie('refresh_token');
    const respnose = {
      message: 'user logged out successfully',
    };
    return respnose;
  }

  async refreshToken(doctorId: number, refresh_token: string, res: Response) {
    const decodeToken = await this.jwtService.decode(refresh_token);
    console.log(doctorId);
    console.log(decodeToken['id']);

    if (doctorId !== decodeToken['id']) {
      throw new ForbiddenException('Ruxsat etilmagan');
    }
    const doctor = await this.doctorService.findOne(doctorId);

    console.log('Hashed token:', doctor?.hashed_refresh_token);

    if (!doctor || !doctor.hashed_refresh_token) {
      throw new NotFoundException('user not found');
    }

    const tokenMatch = await bcrypt.compare(
      refresh_token,
      doctor.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const { accessToken, refreshToken } =
      await this.generateTokenDoctor(doctor);

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.doctorService.updateRefreshToken(
      doctor.id,
      hashed_refresh_token,
    );

    res.cookie('refresh_token', refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const respnose = {
      message: 'User refreshed',
      patientId: doctor.id,
      access_token: accessToken,
    };
    return respnose;
  }
}
