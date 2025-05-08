import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Staff } from './models/staff.model';

@Injectable()
export class StaffsService {
  constructor(@InjectModel(Staff) private readonly staffModule: typeof Staff){}

  async createStaff(createStaffDto: CreateStaffDto) {
    const staff = await this.staffModule.create(createStaffDto)
    return staff
  }

  findAllStaff() {
    return this.staffModule.findAll({include: {all: true}})
  }

  async findOneStaff(id: number) {
    return this.staffModule.findByPk(id)
  }

  async updateStaff(id: number, updateStaffDto: UpdateStaffDto):Promise<Staff | null> {
    const update = await this.staffModule.update(updateStaffDto, 
      {
        where: {id},
        returning: true,
      })

    return update[1][0]
  }

  async remove(id: number):Promise<string> {
    const deleted = await this.staffModule.destroy({
      where: {id},
    })

    if (deleted > 0){
      return "Staff o'chirildi"
    }
    return "Bunday Staff mavjud emas"
  }
}
