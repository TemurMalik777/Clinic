import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SelfStaffGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const staffRoles = ['vrach', 'manager'];
    const user = req.user;
    const paramId = Number(req.params.id);

    if (!user) {
      throw new ForbiddenException({
        message: 'Foydalanuvchi topilmadi',
      });
    }

    if (user.is_creater) {
      return true;
    }

    const isStaff = staffRoles.includes(user.role);
    const isSameUser = user.id === paramId;

    if (isStaff && isSameUser) {
      return true;
    }

    throw new ForbiddenException({
      message: "Faqat o'z profilingizga kirish mumkin",
    });
  }
}
