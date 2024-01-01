import { applyDecorators } from '@nestjs/common';
import { Matches, MaxLength, MinLength } from 'class-validator';
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from '@res/shared';

export function ValidatePassword() {
  return applyDecorators(
    MinLength(PASSWORD_MIN_LENGTH),
    MaxLength(PASSWORD_MAX_LENGTH),
    Matches(PASSWORD_REGEX),
  );
}
