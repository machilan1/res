import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export function ValidateEmail() {
  return applyDecorators(
    IsNotEmpty(),
    IsEmail(),
    Transform((params) => params.value.toLowerCase()),
  );
}
