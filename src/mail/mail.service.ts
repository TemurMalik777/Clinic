import { Injectable } from '@nestjs/common';
import { Doctor } from '../doctors/models/doctor.model';
import { Staff } from '../staffs/models/staff.model';
import { MailerService } from '@nestjs-modules/mailer';
import { Patient } from '../patients/models/patient.model';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  // async sendDoctorMail(doctor: Doctor) {
  //   const url = `${process.env.API_HOST}/api/doctor/activate/${doctor.activate_link}`;

  //   await this.mailerService.sendMail({
  //     to: doctor.email,
  //     subject: "Welcome to Shifoxona App!",
  //     template: "./confirmation",
  //     context: {
  //       name: doctor.full_name,
  //       url,
  //     },
  //   });
  // }

  // async sendAdminMail(admin: Admin) {
  //   const url = `${process.env.API_HOST}/api/admin/activate/${admin.activate_link}`;

  //   await this.mailerService.sendMail({
  //     to: admin.email,
  //     subject: "Welcome to Shifoxona App!",
  //     template: "./confirmation",
  //     context: {
  //       name: admin.full_name,
  //       url,
  //     },
  //   });
  // }

  async sendStaffMail(staff: Staff) {
    const url = `${process.env.API_HOST}/api/staff/activate/${staff.active_link}`;

    await this.mailerService.sendMail({
      to: staff.email,
      subject: 'Welcome to Shifoxona App!',
      template: './confirmation',
      context: {
        name: staff.username,
        url,
      },
    });
  }

  async sendPatientMail(patient: Patient) {
    const url = `${process.env.API_HOST}/api/patients/activate/${patient.active_link}`;

    await this.mailerService.sendMail({
      to: patient.email,
      subject: 'Welcome to Shifoxona App!',
      template: './confirmation',
      context: {
        name: patient.first_name,
        url,
      },
    });
  }
}
