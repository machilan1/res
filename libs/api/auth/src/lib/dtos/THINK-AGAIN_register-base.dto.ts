import {
  ValidateEmail,
  ValidateName,
  ValidatePassword,
  ValidatePhone,
} from '@res/api-shared';
import { RegisterAdminDto } from './register-admin.dto';
import { RegisterLandlordDto } from './register-landlord.dto';
import { RegisterStudentDto } from './student-register.dto';

export class RegisterBase
  implements RegisterAdminDto, RegisterLandlordDto, RegisterStudentDto
{
  @ValidateName()
  name!: string;

  @ValidatePhone()
  phone!: string;

  @ValidatePassword()
  password!: string;

  @ValidateEmail()
  email!: string;
}
