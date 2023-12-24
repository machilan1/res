import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@res/shared';
import { Transform } from 'class-transformer';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class AdminLoginDto {
  @IsNotEmpty()
  @Transform((params) => params.value.toLowerCase())
  email!: string;

  @MinLength(PASSWORD_MIN_LENGTH)
  @Matches(PASSWORD_REGEX)
  password!: string;
}
