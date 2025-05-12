import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SelfPatientGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const paramId = Number(req.params.id);

    const isPatient = user?.role === 'patient';
    const isSuperAdmin = user?.is_creater === true;
    const isAdmin = user?.is_creater === false && !user?.role;
    const isSameUser = user?.id === paramId;

    if (isPatient && (!isSameUser || isNaN(paramId))) {
      throw new ForbiddenException({
        message: "Faqat o'z profilingizga kirish mumkin",
      });
    }

    if (isSuperAdmin || isAdmin) {
      return true;
    }

    if (isPatient && isSameUser) {
      return true;
    }

    throw new ForbiddenException({
      message: 'Kirish mumkin emas',
    });
  }
}
