import { Transform } from 'class-transformer';
import { Matches, MaxLength, MinLength } from 'class-validator';
import { PASSWORD_REGEX, STUDENT_NUMBER_REGEX } from '@res/shared';

export class StudentLoginDto {
  @MinLength(9)
  @MaxLength(9)
  @Matches(STUDENT_NUMBER_REGEX)
  @Transform((params) => params.value.toLowerCase())
  studentNumber!: string;

  @MinLength(6)
  @Matches(PASSWORD_REGEX)
  password!: string;
}
