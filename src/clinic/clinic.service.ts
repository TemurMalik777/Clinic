import { Injectable } from '@nestjs/common';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { GetClinicQueryDto } from './dto/get-clinic-query.dto';
import { Op } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { Patient } from '../patients/models/patient.model';

@Injectable()
export class ClinicService {
  constructor(@InjectModel(Patient) private patientModel: typeof Patient) {}
  create(createClinicDto: CreateClinicDto) {
    return 'This action adds a new clinic';
  }

  async findAll(query: GetClinicQueryDto) {
    const { name, address, sortByRating, page = 1, limit = 10 } = query;

    const where: any = {};
    if (name) where.name = { [Op.iLike]: `%${name}%` };
    if (address) where.address = { [Op.iLike]: `%${address}%` };

    const order: any[] = [];
    if (sortByRating) {
      order.push(['rating', sortByRating]);
    }

    const clinics = await this.patientModel.findAll({
      where,
      order,
      offset: (Number(page) - 1) * Number(limit),
      limit: Number(limit),
    });

    return clinics;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinic`;
  }

  update(id: number, updateClinicDto: UpdateClinicDto) {
    return `This action updates a #${id} clinic`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinic`;
  }
}
