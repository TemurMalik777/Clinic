import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FalseAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const patientId = req.params.id;

    if (!user || typeof user.is_creater !== 'boolean' || !user.id) {
      throw new ForbiddenException({
        message: "Foydalanuvchi topilmadi yoki noto'g'ri formatda",
      });
    }

    if (user.is_creater === false && user.id !== +patientId) {
      throw new ForbiddenException({
        message: 'Siz faqat o\'z ma\'lumotlaringizni ko\'rishingiz mumkin',
      });
    }

    return true;
  }
}