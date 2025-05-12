import { Module } from '@nestjs/common';
import { AuthService } from './patients-auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PatientsModule } from '../patients/patients.module';
import { AuthController } from './patients-auth/auth.controller';
import { DoctorsModule } from '../doctors/doctors.module';
import { DocAuthController } from './doctor-auth/doctor-auth.controller';
import { DocAuthService } from './doctor-auth/doctor-auth.service';
import { StaffAuthService } from './staff-auth/staff-auth.service';
import { StaffsModule } from '../staffs/staffs.module';
import { StaffAuthController } from './staff-auth/staff-auth.controller';
// import { AdminAuthService } from './admin-auth/admin-auth.service';
import { AdminAuthController } from './admin-auth/admin-auth.controller';
import { AdminModule } from '../admin/admin.module';
import { AdminAuthService } from './admin-auth/admin-auth.service';

@Module({
  imports: [JwtModule.register({ global: true }), PatientsModule, DoctorsModule, StaffsModule, AdminModule],
  controllers: [AuthController, DocAuthController, StaffAuthController, AdminAuthController],
  providers: [AuthService, DocAuthService, StaffAuthService, AdminAuthService ]
})
export class AuthModule {}
