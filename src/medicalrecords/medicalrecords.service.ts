import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Medicalrecord } from './models/medicalrecord.model';
import { CreateMedicalrecordDto } from './dto/create-medicalrecord.dto';
import { UpdateMedicalrecordDto } from './dto/update-medicalrecord.dto';

@Injectable()
export class MedicalrecordsService {
  constructor(
    @InjectModel(Medicalrecord)
    private readonly medicalrecordModule: typeof Medicalrecord,
  ) {}

  async create(
    createMedicalrecordDto: CreateMedicalrecordDto,
  ): Promise<Medicalrecord> {
    return await this.medicalrecordModule.create(createMedicalrecordDto);
  }

  async findAll(): Promise<Medicalrecord[]> {
    return await this.medicalrecordModule.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number): Promise<Medicalrecord | null> {
    return await this.medicalrecordModule.findByPk(id);
  }

  async update(
    id: number,
    updateMedicalrecordDto: UpdateMedicalrecordDto,
  ): Promise<Medicalrecord | null> {
    const update = await this.medicalrecordModule.update(
      updateMedicalrecordDto,
      {
        where: { id },
        returning: true,
      },
    );
    return update[1][0];
  }

  async remove(id: number): Promise<string> {
    const deletedCount = await this.medicalrecordModule.destroy({
      where: { id },
    });
    return deletedCount > 0
      ? "Medicalrecord o'chirildi"
      : 'Bunday medicalrecord topilmadi';
  }
}
