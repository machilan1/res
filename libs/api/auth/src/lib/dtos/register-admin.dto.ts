import { InsertAdmin, InsertUser } from '@res/api-database';
import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PHONE_MAX_LENGTH,
  PHONE_MIN_LENGTH,
  PHONE_REGEX,
} from '@res/shared';
import { Transform } from 'class-transformer';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterAdminDto {
  @MinLength(NAME_MIN_LENGTH)
  @MaxLength(NAME_MAX_LENGTH)
  name!: string;

  @MinLength(PHONE_MIN_LENGTH)
  @MaxLength(PHONE_MAX_LENGTH)
  @Matches(PHONE_REGEX)
  phone!: string;

  @MaxLength(PASSWORD_MIN_LENGTH)
  @Matches(PASSWORD_REGEX)
  password!: string;

  @IsNotEmpty()
  @Transform((params) => params.value.toLowerCase())
  email!: string;
}
