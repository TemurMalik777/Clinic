import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SelfAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new ForbiddenException({
        message: 'Foydalanuvchi topilmadi',
      });
    }

    if (!user.is_creater) {
      throw new ForbiddenException({
        message: 'Siz super admin (yaratuvchi) emassiz!',
      });
    }

    return true;
  }
}



