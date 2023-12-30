import { applyDecorators } from '@nestjs/common';
import { STUDENT_NUMBER_LENGTH, STUDENT_NUMBER_REGEX } from '@res/shared';
import { Transform } from 'class-transformer';
import { Matches, MaxLength, MinLength } from 'class-validator';

export function ValidateStudentNumber() {
  return applyDecorators(
    MinLength(STUDENT_NUMBER_LENGTH),
    MaxLength(STUDENT_NUMBER_LENGTH),
    Matches(STUDENT_NUMBER_REGEX),
    Transform((params) => params.value.toLowerCase()),
  );
}
