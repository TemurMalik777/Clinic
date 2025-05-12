import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Patient } from '../../patients/models/patient.model';
import { PatientsService } from '../../patients/patients.service';
import { CreatePatientDto } from '../../patients/dto/create-patient.dto';
import { SignInDto } from '../dto/sing-in.dto';
import { Response } from 'express';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly patientService: PatientsService,
    readonly jwtService: JwtService,
  ) {}

  private async generateTokenPatient(patient: Patient) {
    const payload = {
      id: patient.id,
      email: patient.email,
      isActive: patient.is_active,
      role: patient.role,
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

  async signUp(createPatientDto: CreatePatientDto) {
    const patient = await this.patientService.findPatientByEmail(
      createPatientDto.email,
    );

    if (patient) {
      throw new ConflictException('Bunday emailli foydalanuvchi mavjud');
    }

    const newPatient = await this.patientService.create(createPatientDto);
    return { message: "Foydalanuvchi qo'shildi", patient_id: newPatient.id };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const patient = await this.patientService.findPatientByEmail(
      signInDto.email,
    );
    if (!patient) {
      throw new BadRequestException("Email yoki password noto'g'ri");
    }

    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      patient.hashed_password,
    );
    if (!isValidPassword) {
      throw new BadRequestException("Email yoki password noto'g'ri");
    }

    const { accessToken, refreshToken } =
      await this.generateTokenPatient(patient);
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    patient.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await patient.save();
    res.status(200).send({
      message: 'Tizimga xush keleibsiz',
      refreshToken,
    });
  }

  async signOut(refreshToken: string, res: Response) {
    const patientData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!patientData) {
      throw new ForbiddenException('patient not verified');
    }
    const hashed_refresh_token = '';
    await this.patientService.updateRefreshToken(
      patientData.id,
      hashed_refresh_token,
    );

    res.clearCookie('refresh_token');
    const respnose = {
      message: 'user logged out successfully',
    };
    return respnose;
  }

  async refreshToken(patientId: number, refresh_token: string, res: Response) {
    const decodeToken = await this.jwtService.decode(refresh_token);
    console.log(patientId);
    console.log(decodeToken['id']);

    if (patientId !== decodeToken['id']) {
      throw new ForbiddenException('Ruxsat etilmagan');
    }
    const patient = await this.patientService.findOne(patientId);

    console.log('Hashed token:', patient?.hashed_refresh_token);

    if (!patient || !patient.hashed_refresh_token) {
      throw new NotFoundException('user not found');
    }

    const tokenMatch = await bcrypt.compare(
      refresh_token,
      patient.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const { accessToken, refreshToken } =
      await this.generateTokenPatient(patient);

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.patientService.updateRefreshToken(
      patient.id,
      hashed_refresh_token,
    );

    res.cookie('refresh_token', refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const respnose = {
      message: 'User refreshed',
      patientId: patient.id,
      access_token: accessToken,
    };
    return respnose;
  }
}
