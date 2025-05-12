import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin/models/admin.model';
import { StaffsModule } from './staffs/staffs.module';
import { Staff } from './staffs/models/staff.model';
import { AppointmentsModule } from './appointments/appointments.module';
import { Appointment } from './appointments/models/appointment.model';
import { MedicalrecordsModule } from './medicalrecords/medicalrecords.module';
import { Medicalrecord } from './medicalrecords/models/medicalrecord.model';
import { LabTestsModule } from './lab_tests/lab_tests.module';
import { MedicationsModule } from './medications/medications.module';
import { Medication } from './medications/models/medication.model';
import { LabTest } from './lab_tests/models/lab_test.model';
import { PaymentsModule } from './payments/payments.module';
import { Payment } from './payments/models/payment.models';
import { PricesServicesModule } from './prices_services/prices_services.module';
import { PricesService } from './prices_services/models/prices_service.model';
import { PaymentMethodsModule } from './payment_methods/payment_methods.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { Prescription } from './prescriptions/models/prescription.model';
import { SpecializationModule } from './specialization/specialization.module';
import { Specialization } from './specialization/models/specialization.model';
import { PatientsModule } from './patients/patients.module';
import { Patient } from './patients/models/patient.model';
import { DoctorsModule } from './doctors/doctors.module';
import { Doctor } from './doctors/models/doctor.model';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ClinicModule } from './clinic/clinic.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        Admin,
        Staff,
        Appointment,
        Medicalrecord,
        Medication,
        LabTest,
        Payment,
        PricesService,
        Payment,
        Prescription,
        Specialization,
        Patient,
        Doctor,
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    AdminModule,
    StaffsModule,
    AppointmentsModule,
    MedicalrecordsModule,
    LabTestsModule,
    MedicationsModule,
    PaymentsModule,
    PricesServicesModule,
    PaymentMethodsModule,
    PrescriptionsModule,
    SpecializationModule,
    PatientsModule,
    DoctorsModule,
    AuthModule,
    MailModule,
    ClinicModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
