import { applyDecorators } from '@nestjs/common';
import { Matches, MinLength } from 'class-validator';
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@res/shared';

export function ValidatePassword() {
  return applyDecorators(
    MinLength(PASSWORD_MIN_LENGTH),
    Matches(PASSWORD_REGEX),
  );
}
