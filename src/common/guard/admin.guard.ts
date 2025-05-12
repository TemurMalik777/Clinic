import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user || typeof user.is_creater !== 'boolean') {
      throw new ForbiddenException({
        message: "Foydalanuvchi topilmadi yoki admin formatda emasiz",
      });
    }

    const isAdmin = user.is_creater === true || user.is_creater === false;

    if (!isAdmin) {
      throw new ForbiddenException({
        message: 'Faqat administratorlarga ruxsat berilgan',
      });
    }

    return true;
  }
}
