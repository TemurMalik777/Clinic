import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class StaffGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const staffRoles = ['vrach', 'felsher', 'manager']; 

    if (!user) {
      throw new ForbiddenException({
        message: 'Foydalanuvchi topilmadi',
      });
    }

    if (user.is_creater || user.role === 'admin') {
      return true;
    }

    if (!staffRoles.includes(user.role)) {
      throw new ForbiddenException({
        message: "Sizga kirish ruxsati yo'q",
      });
    }

    return true;
  }
}
