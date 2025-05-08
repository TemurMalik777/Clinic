import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { Specialization } from './models/specialization.model';

@Injectable()
export class SpecializationService {
  constructor(
    @InjectModel(Specialization)
    private readonly specializationModule: typeof Specialization,
  ) {}

  async create(
    createSpecializationDto: CreateSpecializationDto,
  ): Promise<Specialization> {
    const specialization = await this.specializationModule.create(
      createSpecializationDto,
    );
    return specialization;
  }

  async findAll(): Promise<Specialization[]> {
    return this.specializationModule.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Specialization | null> {
    return this.specializationModule.findByPk(id);
  }

  async update(
    id: number,
    updateSpecializationDto: UpdateSpecializationDto,
  ): Promise<Specialization | null> {
    const updatedSpecialization = await this.specializationModule.update(
      updateSpecializationDto,
      {
        where: { id },
        returning: true,
      },
    );

    return updatedSpecialization[1][0];
  }

  async remove(id: number): Promise<string> {
    const deleted = await this.specializationModule.destroy({
      where: { id },
    });

    if (deleted > 0) {
      return "Specialization o'chirildi";
    }
    return 'Bunday specialization mavjud emas';
  }
}
