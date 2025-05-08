import { Module } from '@nestjs/common';
import { LabTestsService } from './lab_tests.service';
import { LabTestsController } from './lab_tests.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LabTest } from './models/lab_test.model';

@Module({
  imports: [SequelizeModule.forFeature([LabTest])],
  controllers: [LabTestsController],
  providers: [LabTestsService],
})
export class LabTestsModule {}
