import { applyDecorators } from '@nestjs/common';
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '@res/shared';
import { MaxLength, MinLength } from 'class-validator';

export function ValidateName() {
  return applyDecorators(
    MinLength(NAME_MIN_LENGTH),
    MaxLength(NAME_MAX_LENGTH),
  );
}
