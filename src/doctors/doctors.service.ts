import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './models/doctor.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor) private readonly doctorModel: typeof Doctor,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const hashedPassword = await bcrypt.hash(createDoctorDto.password, 7);
    const doctor = await this.doctorModel.create({
      ...createDoctorDto,
      hashed_password: hashedPassword,
    });
    return doctor;
  }

  findDoctorByEmail(email: string) {
    return this.doctorModel.findOne({ where: { email } });
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Doctor | null> {
    return this.doctorModel.findByPk(id);
  }

  async update(
    id: number,
    updateDoctorDto: UpdateDoctorDto,
  ): Promise<Doctor | null> {
    if (updateDoctorDto.password) {
      updateDoctorDto.password = await bcrypt.hash(updateDoctorDto.password, 7);
    }

    const updated = await this.doctorModel.update(updateDoctorDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  async remove(id: number): Promise<string> {
    const deleted = await this.doctorModel.destroy({
      where: { id },
    });

    if (deleted > 0) {
      return "Doctor o'chirildi";
    }
    return 'Bunday Doctor mavjud emas';
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    const updateDoctor = await this.doctorModel.update(
      { hashed_refresh_token },
      { where: { id } },
    );
    return updateDoctor;
  }

  async updateDoctorsPassword(
    id: number,
    dto: { oldPassword: string; newPassword: string },
  ): Promise<string> {
    const doctor = await this.doctorModel.findByPk(id);
    if (!doctor) throw new NotFoundException('Doctor topilmadi');

    const isMatch = await bcrypt.compare(
      dto.oldPassword,
      doctor.hashed_password,
    );
    if (!isMatch) throw new BadRequestException('Eski parol noto‘g‘ri');

    const hashedNewPassword = await bcrypt.hash(dto.newPassword, 7);
    doctor.hashed_password = hashedNewPassword;
    await doctor.save();

    return 'Parol muvaffaqiyatli yangilandi';
  }
}
