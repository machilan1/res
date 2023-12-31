import { IsOptional, Min, ValidateIf } from 'class-validator';

import {
  NotSmallerThan,
  START_IS_LARGER_ERR,
  ValidateEmail,
  ValidateName,
  ValidatePassword,
  ValidatePhone,
} from '@res/api-shared';

export class RegisterLandlordDto {
  @ValidateName()
  name!: string;

  @ValidatePhone()
  phone!: string;

  @ValidateEmail()
  email!: string;

  @ValidatePassword()
  password!: string;

  @IsOptional()
  @Min(0)
  contactTimeStart!: number;

  @IsOptional()
  @ValidateIf((entry) => entry.contactTimeStart)
  @NotSmallerThan('contactTimeStart', {
    message: START_IS_LARGER_ERR,
  })
  contactTimeEnd!: number;
}
