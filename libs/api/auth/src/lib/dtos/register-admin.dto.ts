import {
  ValidateEmail,
  ValidateName,
  ValidatePassword,
  ValidatePhone,
} from '@res/api-shared';

export class RegisterAdminDto {
  @ValidateName()
  name!: string;

  @ValidatePhone()
  phone!: string;

  @ValidatePassword()
  password!: string;

  @ValidateEmail()
  email!: string;
}
