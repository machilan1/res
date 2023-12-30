import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { PHONE_MAX_LENGTH, PHONE_MIN_LENGTH } from '@res/shared';
export class UpdateStudentDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @MinLength(PHONE_MIN_LENGTH)
  @MaxLength(PHONE_MAX_LENGTH)
  phone?: string;
}
