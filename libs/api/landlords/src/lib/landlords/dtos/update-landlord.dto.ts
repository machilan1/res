import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PHONE_MAX_LENGTH,
  PHONE_MIN_LENGTH,
  PHONE_REGEX,
} from '@res/shared';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Matches,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';

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

  @IsOptional()
  @IsPositive()
  @Max(24)
  contactTimeStart?: number;

  @IsOptional()
  @IsPositive()
  @Max(24)
  contactTimeEnd?: number;
}
