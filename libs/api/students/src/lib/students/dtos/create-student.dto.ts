import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PHONE_MAX_LENGTH,
  PHONE_MIN_LENGTH,
  STUDENT_NUMBER_LENGTH,
  STUDENT_NUMBER_REGEX,
} from '@res/shared';
import { Matches, MaxLength, MinLength } from 'class-validator';

export class CreateStudentDto {
  @MinLength(NAME_MIN_LENGTH)
  @MaxLength(NAME_MAX_LENGTH)
  name!: string;

  @MinLength(STUDENT_NUMBER_LENGTH)
  @Matches(STUDENT_NUMBER_REGEX)
  studentNumber!: string;

  @MinLength(PHONE_MIN_LENGTH)
  @MaxLength(PHONE_MAX_LENGTH)
  phone!: string;
}
