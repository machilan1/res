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

class ContactTime {
  start!: number;
  end!: number;
}

export class RegisterLandlordDto {
  @MinLength(NAME_MIN_LENGTH)
  @MaxLength(NAME_MAX_LENGTH)
  name!: string;

  @MinLength(PHONE_MIN_LENGTH)
  @MaxLength(PHONE_MAX_LENGTH)
  @Matches(PHONE_REGEX)
  phone!: string;

  @IsNotEmpty()
  @Transform((params) => params.value.toLowerCase())
  email!: string;

  @MinLength(PASSWORD_MIN_LENGTH)
  password!: string;

  @Optional()
  @Type(() => ContactTime)
  contactTime!: ContactTime | null | undefined;
}
