import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PHONE_MAX_LENGTH,
  PHONE_MIN_LENGTH,
  PHONE_REGEX,
} from '@res/shared';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

class ContactTime {
  start!: number;
  end!: number;
}

export class UpdateLandlordDto {
  @IsOptional()
  @MinLength(NAME_MIN_LENGTH)
  @MaxLength(NAME_MAX_LENGTH)
  name?: string;

  @IsOptional()
  @MinLength(PHONE_MIN_LENGTH)
  @MaxLength(PHONE_MAX_LENGTH)
  @Matches(PHONE_REGEX)
  phone?: string;

  @IsOptional()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsBoolean()
  banned?: boolean;

  @Type(() => ContactTime)
  @IsOptional()
  contactTime?: ContactTime;
}
