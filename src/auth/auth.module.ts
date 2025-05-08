import { Module } from '@nestjs/common';
import { AuthService } from './patients/auth.service';
import { AuthController } from './patients/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
