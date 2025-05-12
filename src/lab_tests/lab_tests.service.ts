import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LabTest } from './models/lab_test.model';
import { CreateLabTestDto } from './dto/create-lab_test.dto';
import { UpdateLabTestDto } from './dto/update-lab_test.dto';

@Injectable()
export class LabTestsService {
  constructor(@InjectModel(LabTest) private readonly labTestModel: typeof LabTest) {}

  async create(createLabTestDto: CreateLabTestDto): Promise<LabTest> {
    const labTest = await this.labTestModel.create(createLabTestDto);
    return labTest;
  }

  async findAll(): Promise<LabTest[]> {
    return this.labTestModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<LabTest | null> {
    return this.labTestModel.findByPk(id);
  }

  async update(id: number, updateLabTestDto: UpdateLabTestDto): Promise<LabTest | null> {
    const updated = await this.labTestModel.update(updateLabTestDto, {
      where: { id },
      returning: true,
    });

    return updated[1][0];
  }

  async remove(id: number): Promise<string> {
    const deleted = await this.labTestModel.destroy({
      where: { id },
    });

    if (deleted > 0) {
      return `${id}-LabTest o'chirildi`;
    }
    return 'Bunday LabTest mavjud emas';
  }
}
