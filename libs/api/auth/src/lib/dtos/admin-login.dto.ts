import { ValidateEmail, ValidatePassword } from '@res/api-shared';

export class AdminLoginDto {
  @ValidateEmail()
  email!: string;

  @ValidatePassword()
  password!: string;
}
