import { ValidateEmail, ValidatePassword } from '@res/api-shared';

export class LandlordLoginDto {
  @ValidateEmail()
  email!: string;

  @ValidatePassword()
  password!: string;
}
