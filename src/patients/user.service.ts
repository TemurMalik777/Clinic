import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { User } from './user.entity';
import { Repository } from 'typeorm';
import { User } from './models/user.model';
import { Patient } from './models/patient.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Patient)
    private userRepository: Repository<Patient>,
  ) {}

  async aqlliQidiruv(query: { name?: string; email?: string; phone_number?: string }) {
    const qb = this.userRepository.createQueryBuilder('');

    if (query.name) {
      qb.andWhere('user.ism ILIKE :ism', { ism: `%${query.name}%` });
    }

    if (query.email) {
      qb.andWhere('user.email ILIKE :email', { email: `%${query.email}%` });
    }

    if (query.phone_number) {
      qb.andWhere('user.yosh = :phone_number', { phone_number: query.phone_number });
    }

    return qb.getMany();
  }
}
