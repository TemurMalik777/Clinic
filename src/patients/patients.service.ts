import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './models/patient.model';

import * as bcrypt from 'bcrypt';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient) private readonly patientModule: typeof Patient,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const hashedPassword = await bcrypt.hash(createPatientDto.password, 10);

    const patientWithHashedPassword = {
      ...createPatientDto,
      password: hashedPassword,
    };

    const patient = await this.patientModule.create(patientWithHashedPassword);
    return patient;
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

  // patients.service.ts
  async updatePatientsPassword(
    id: number,
    dto: { oldPassword: string; newPassword: string },
  ): Promise<string> {
    const patient = await this.patientModule.findByPk(id);
    if (!patient) throw new NotFoundException('Patient topilmadi');

    const isMatch = await bcrypt.compare(dto.oldPassword, patient.password);
    if (!isMatch) throw new BadRequestException('Eski parol notogri');

    const hashedNewPassword = await bcrypt.hash(dto.newPassword, 7);
    patient.password = hashedNewPassword;
    await patient.save();

    return 'Parol muvaffaqiyatli yangilandi';
  }
}
