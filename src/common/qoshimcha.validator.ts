// src/common/validators/is-email-unique.validator.ts
import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
  } from 'class-validator';
  
  export function IsEmailUnique(model: any, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
      registerDecorator({
        name: 'isEmailUnique',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          async validate(value: any, args: ValidationArguments) {
            // model ni to'g'ri ishlatish
            const existingUser = await model.findOne({ where: { email: value } });
            return !existingUser; // Agar email mavjud bo'lsa, false qaytaradi
          },
          defaultMessage(args: ValidationArguments) {
            return `${args.property} must be unique`; // Xato xabarini qaytaradi
          },
        },
      });
    };
  }
  