import { Optional } from '@nestjs/common';
import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  PHONE_MAX_LENGTH,
  PHONE_MIN_LENGTH,
  PHONE_REGEX,
} from '@res/shared';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import {
  ValidateEmail,
  ValidateName,
  ValidatePassword,
  ValidatePhone,
} from '@res/api-shared';

class ContactTime {
  start!: number;
  end!: number;
}

export class RegisterLandlordDto {
  @ValidateName()
  name!: string;

  @ValidatePhone()
  phone!: string;

  @ValidateEmail()
  email!: string;

  @ValidatePassword()
  password!: string;

  @Optional()
  @Type(() => ContactTime)
  contactTime!: ContactTime | null | undefined;
}
