import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export function ValidateEmail() {
  return applyDecorators(
    IsNotEmpty(),
    Transform((params) => params.value.toLowerCase()),
  );
}
