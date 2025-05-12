import {
  BadGatewayException,
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './models/patient.model';

import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { ILike } from 'typeorm';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient)
    private readonly patientModule: typeof Patient,
    private readonly mailService: MailService,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const { password, confirm_password } = createPatientDto;

    if (password !== confirm_password) {
      throw new BadGatewayException('Paroller mos emas');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const patientWithHashedPassword = {
      ...createPatientDto,
      hashed_password: hashedPassword,
    };

    const newPatient = await this.patientModule.create(
      patientWithHashedPassword,
    );

    try {
      await this.mailService.sendPatientMail(newPatient);
    } catch (error) {
      console.error(error);
      console.error('Email yuborishda xatolik:', error.message);
      console.error(error.stack);

      throw new ServiceUnavailableException('Emailga xat jonatishda xatolik');
    }

    return newPatient;
  }

  findPatientByEmail(email: string) {
    return this.patientModule.findOne({ where: { email } });
  }

  async findAll(): Promise<Patient[]> {
    return this.patientModule.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Patient | null> {
    return this.patientModule.findByPk(id);
  }

  async update(id: number, updatePatientDto: UpdatePatientDto): Promise<any> {
    if (updatePatientDto.password) {
      const hashedPassword = await bcrypt.hash(updatePatientDto.password, 10);
      updatePatientDto.password = hashedPassword;
    }

    const updated = await this.patientModule.update(updatePatientDto, {
      where: { id },
      returning: true,
    });

    if (updated[0] === 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Bunday id patients mavjud emas',
      };
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Doctor successfully updated',
      data: updated[1][0],
    };
  }

  async remove(id: number): Promise<string> {
    const deleted = await this.patientModule.destroy({ where: { id } });
    return deleted > 0 ? "Patient o'chirildi" : 'Bunday patient mavjud emas';
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    const updatePatient = await this.patientModule.update(
      { hashed_refresh_token },
      { where: { id } },
    );
    return updatePatient;
  }

  // patients.service.ts
  async updatePatientsPassword(
    id: number,
    dto: { oldPassword: string; newPassword: string },
  ): Promise<string> {
    const patient = await this.patientModule.findByPk(id);
    if (!patient) throw new NotFoundException('Patient topilmadi');

    const isMatch = await bcrypt.compare(
      dto.oldPassword,
      patient.hashed_password,
    );
    if (!isMatch) throw new BadRequestException('Eski parol notogri');

    const hashedNewPassword = await bcrypt.hash(dto.newPassword, 7);
    patient.hashed_password = hashedNewPassword;
    await patient.save();

    return 'Parol muvaffaqiyatli yangilandi';
  }

  async findPatientByActivationLink(link: string): Promise<Patient | null> {
    return this.patientModule.findOne({ where: { active_link: link } });
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation jonatilmadi !');
    }

    const update = await this.patientModule.update(
      { is_active: true },
      {
        where: {
          active_link: link,
          is_active: false,
        },
        returning: true,
      },
    );
    if (!update[1][0]) {
      throw new BadRequestException("Allaqachon O'tgansiz");
    }

    return {
      message: 'Staff endi aktiv ',
      is_active: update[1][0].is_active,
    };
  }

  async aqlliQidiruv(query: {
    name?: string;
    email?: string;
    phone_number?: string;
  }) {
    const where: any = {};
    if (query.name) where.name = ILike(`%${query.name}%`);
    if (query.email) where.email = ILike(`%${query.email}%`);
    if (query.phone_number)
      where.phone_number = ILike(`%${query.phone_number}%`);

    return this.patientModule.findAll({ where });
  }
}
