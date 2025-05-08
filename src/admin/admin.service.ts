import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminModule: typeof Admin,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = await this.adminModule.create(createAdminDto);
    return admin;
  }

  async findAllAdmins(): Promise<Admin[]> {
    return this.adminModule.findAll({ include: { all: true } });
  }

  async findOneAdmin(id: number): Promise<Admin | null> {
    return this.adminModule.findByPk(id);
  }

  async updateAdmin(
    id: number,
    updateAdminDto: UpdateAdminDto,
  ): Promise<Admin | null> {
    const updated = await this.adminModule.update(updateAdminDto, {
      where: { id },
      returning: true,
    });

    return updated[1][0]; // update() returns [affectedCount, affectedRows]
  }

  async removeAdmin(id: number): Promise<string> {
    const deleted = await this.adminModule.destroy({
      where: { id },
    });

    if (deleted > 0) {
      return "Admin o'chirildi";
    }
    return 'Bunday Admin mavjud emas';
  }
}
