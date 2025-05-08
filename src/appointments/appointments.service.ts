import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './models/appointment.model';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment)
    private readonly appoinmtentsModule: typeof Appointment,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const appointment =
      await this.appoinmtentsModule.create(createAppointmentDto);
    return appointment;
  }

  async findAll() {
    return this.appoinmtentsModule.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.appoinmtentsModule.findByPk(id);
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment | null> {
    const update = await this.appoinmtentsModule.update(updateAppointmentDto, {
      where: { id },
      returning: true,
    });
    return update[1][0];
  }

  async remove(id: number): Promise<string> {
    const deleted = await this.appoinmtentsModule.destroy({
      where: { id },
    });

    if (deleted > 0) {
      return 'Appoinmtents delete succes';
    }
    return 'Bunday Appoinmtents mavjud emas';
  }
}
