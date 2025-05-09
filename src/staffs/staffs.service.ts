import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Staff } from './models/staff.model';

import * as bcrypt from 'bcrypt';

@Injectable()
export class StaffsService {
  constructor(@InjectModel(Staff) private readonly staffModule: typeof Staff) {}

  async createStaff(createStaffDto: CreateStaffDto): Promise<Staff> {
    const hashedPassword = await bcrypt.hash(createStaffDto.password, 7);
    const staff = await this.staffModule.create({
      ...createStaffDto,
      hashed_password: hashedPassword,
    });

    return staff;
  }

  findStaffByEmail(email: string) {
    return this.staffModule.findOne({ where: { email } });
  }

  findAllStaff() {
    return this.staffModule.findAll({ include: { all: true } });
  }

  async findOneStaff(id: number) {
    return this.staffModule.findByPk(id);
  }

  async updateStaff(
    id: number,
    updateStaffDto: UpdateStaffDto,
  ): Promise<Staff | null> {
    if (updateStaffDto.password) {
      updateStaffDto.password = await bcrypt.hash(updateStaffDto.password, 7);
    }
    const update = await this.staffModule.update(updateStaffDto, {
      where: { id },
      returning: true,
    });

    return update[1][0];
  }

  async remove(id: number): Promise<string> {
    const deleted = await this.staffModule.destroy({
      where: { id },
    });

    if (deleted > 0) {
      return "Staff o'chirildi";
    }
    return 'Bunday Staff mavjud emas';
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    const updateStaff = await this.staffModule.update(
      { hashed_refresh_token },
      { where: { id } },
    );
    return updateStaff;
  }

  async updateStaffPassword(
    id: number,
    dto: { oldPassword: string; newPassword: string },
  ): Promise<string> {
    const staff = await this.staffModule.findByPk(id);
    if (!staff) throw new NotFoundException('Staff topilmadi');

    const isMatch = await bcrypt.compare(
      dto.oldPassword,
      staff.hashed_password,
    );
    if (!isMatch) throw new BadRequestException('Eski parol notogri');

    const hashedNewPassword = await bcrypt.hash(dto.newPassword, 7);
    staff.hashed_password = hashedNewPassword;
    await staff.save();

    return 'Parol muvaffaqiyatli yangilandi';
  }
}
