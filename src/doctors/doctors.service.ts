import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './models/doctor.model';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor) private readonly doctorModel: typeof Doctor,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = await this.doctorModel.create(createDoctorDto);
    return doctor;
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Doctor | null> {
    return this.doctorModel.findByPk(id);
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor | null> {
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
}
