import { applyDecorators } from '@nestjs/common';
import { PHONE_MAX_LENGTH, PHONE_MIN_LENGTH, PHONE_REGEX } from '@res/shared';
import { Transform } from 'class-transformer';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export function ValidatePhone() {
  return applyDecorators(
    MinLength(PHONE_MIN_LENGTH),
    MaxLength(PHONE_MAX_LENGTH),
    Matches(PHONE_REGEX),
  );
}
