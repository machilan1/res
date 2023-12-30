import { ValidatePassword, ValidateStudentNumber } from '@res/api-shared';

export class StudentLoginDto {
  @ValidateStudentNumber()
  studentNumber!: string;

  @ValidatePassword()
  password!: string;
}
