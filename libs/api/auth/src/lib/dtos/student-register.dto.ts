import { Matches, MaxLength, MinLength } from 'class-validator';
import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PHONE_MAX_LENGTH,
  PHONE_MIN_LENGTH,
  PHONE_REGEX,
  STUDENT_NUMBER_LENGTH,
  STUDENT_NUMBER_REGEX,
} from '@res/shared';
import { Transform } from 'class-transformer';
export class RegisterStudentDto {
  @MinLength(NAME_MIN_LENGTH)
  @MaxLength(NAME_MAX_LENGTH)
  name!: string;

  @MinLength(PHONE_MIN_LENGTH)
  @MaxLength(PHONE_MAX_LENGTH)
  @Matches(PHONE_REGEX)
  phone!: string;

  @MinLength(STUDENT_NUMBER_LENGTH)
  @MaxLength(STUDENT_NUMBER_LENGTH)
  @Matches(STUDENT_NUMBER_REGEX)
  @Transform((params) => params.value.toLowerCase())
  studentNumber!: string;

  @MinLength(PASSWORD_MIN_LENGTH)
  @Matches(PASSWORD_REGEX)
  password!: string;
}
