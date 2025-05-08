import { Module } from '@nestjs/common';
import { MedicalrecordsService } from './medicalrecords.service';
import { MedicalrecordsController } from './medicalrecords.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Medicalrecord } from './models/medicalrecord.model';

@Module({
  imports: [SequelizeModule.forFeature([Medicalrecord])],
  controllers: [MedicalrecordsController],
  providers: [MedicalrecordsService],
})
export class MedicalrecordsModule {}
