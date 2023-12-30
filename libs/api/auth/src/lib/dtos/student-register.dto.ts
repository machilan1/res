import {
  ValidateName,
  ValidatePassword,
  ValidatePhone,
  ValidateStudentNumber,
} from '@res/api-shared';
export class RegisterStudentDto {
  @ValidateName()
  name!: string;

  @ValidatePhone()
  phone!: string;

  @ValidateStudentNumber()
  studentNumber!: string;

  @ValidatePassword()
  password!: string;
}
