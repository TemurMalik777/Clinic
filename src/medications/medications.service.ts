import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { Medication } from './models/medication.model';

@Injectable()
export class MedicationsService {
  constructor(
    @InjectModel(Medication)
    private readonly medicationModel: typeof Medication,
  ) {}

  async create(createMedicationDto: CreateMedicationDto): Promise<Medication> {
    const medication = await this.medicationModel.create(createMedicationDto);
    return medication;
  }

  async findAll(): Promise<Medication[]> {
    return this.medicationModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Medication | null> {
    return this.medicationModel.findByPk(id);
  }

  async update(
    id: number,
    updateMedicationDto: UpdateMedicationDto,
  ): Promise<Medication | null> {
    const updated = await this.medicationModel.update(updateMedicationDto, {
      where: { id },
      returning: true,
    });

    return updated[1][0];
  }

  async remove(id: number): Promise<string> {
    const deleted = await this.medicationModel.destroy({
      where: { id },
    });

    if (deleted > 0) {
      return "Medication o'chirildi";
    }
    return 'Bunday Medication mavjud emas';
  }
}
