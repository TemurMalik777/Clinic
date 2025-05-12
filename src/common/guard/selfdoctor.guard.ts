import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SelfDoctorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const paramId = Number(req.params.id);

    if (!user || isNaN(paramId)) {
      throw new ForbiddenException({
        message: 'Foydalanuvchi topilmadi yoki noto‘g‘ri ID',
      });
    }

    if (user.is_creater === true || user.is_creater === false) {
      return true;
    }

    if (user.role === 'doctor' && user.id === paramId) {
      return true;
    }

    throw new ForbiddenException({
      message:
        "Faqat o'z profilingizga yoki ruxsat berilgan profilinga kirish mumkin",
    });
  }
}
// import {
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
//   Injectable,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class SelfAdminGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const req = context.switchToHttp().getRequest();
//     const user = req.user;

//     if (!user) {
//       throw new ForbiddenException({
//         message: 'Foydalanuvchi topilmadi',
//       });
//     }

//     const requestedId = parseInt(req.params.id, 10);
//     const userId = user.id;

//     // Agar user doctor bo‘lsa, faqat o‘z id si bilan ishlashi mumkin
//     if (user.role === 'doctor' && userId !== requestedId) {
//       throw new ForbiddenException({
//         message: 'Doctor faqat o‘ziga tegishli ma’lumotlarni ko‘ra oladi.',
//       });
//     }

//     // Agar doctor bo‘lmasa (masalan admin), ruxsat beriladi
//     return true;
//   }
// }
