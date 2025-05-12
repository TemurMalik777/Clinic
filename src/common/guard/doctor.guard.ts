import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DoctorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const paramId = Number(req.params.id); 

    if (!user) {
      throw new ForbiddenException({
        message: 'Foydalanuvchi topilmadi',
      });
    }

    if (user.is_creater || user.role === 'admin') {
      return true;
    }

    if (user.role === 'doctor' && user.id !== paramId) {
      throw new ForbiddenException({
        message: "Faqat o'zingizning ma'lumotlaringizni ko'rishingiz mumkin",
      });
    }

    return true;
  }
}
