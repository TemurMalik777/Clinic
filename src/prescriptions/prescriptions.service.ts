import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Prescription } from './models/prescription.model';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectModel(Prescription)
    private readonly prescriptionModule: typeof Prescription,
  ) {}

  async create(
    createPrescriptionDto: CreatePrescriptionDto,
  ): Promise<Prescription> {
    const prescription = await this.prescriptionModule.create(
      createPrescriptionDto,
    );
    return prescription;
  }

  async findAll(): Promise<Prescription[]> {
    return this.prescriptionModule.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Prescription | null> {
    return this.prescriptionModule.findByPk(id);
  }

  async update(
    id: number,
    updatePrescriptionDto: UpdatePrescriptionDto,
  ): Promise<Prescription | null> {
    const updated = await this.prescriptionModule.update(
      updatePrescriptionDto,
      {
        where: { id },
        returning: true,
      },
    );
    return updated[1][0];
  }

  async remove(id: number): Promise<string> {
    const deleted = await this.prescriptionModule.destroy({
      where: { id },
    });

    if (deleted > 0) {
      return "Prescription o'chirildi";
    }
    return 'Bunday Prescription mavjud emas';
  }
}
