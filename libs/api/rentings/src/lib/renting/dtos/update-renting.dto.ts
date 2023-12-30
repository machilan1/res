import { Feature } from '../entity/local/feature.entity';
import { Rule } from '../entity/local/rule.entity';
import { IsNotEmpty, IsOptional, IsPositive, MaxLength } from 'class-validator';
import {
  RENTING_ADDRESS_MAX_LENGTH,
  RENTING_DESCRIPTION_MAX_LENGTH,
  RENTING_TITLE_MAX_LENGTH,
} from '@res/shared';

export class UpdateRentingDto {
  // landlordId!: number;
  @IsOptional()
  @MaxLength(RENTING_TITLE_MAX_LENGTH)
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @MaxLength(RENTING_DESCRIPTION_MAX_LENGTH)
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsPositive()
  typeId?: number;

  @IsOptional()
  @IsPositive()
  campusId?: number;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(RENTING_ADDRESS_MAX_LENGTH)
  address?: string;

  @IsOptional()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsPositive()
  square?: number;

  @IsOptional()
  @IsPositive()
  floor?: number;

  @IsOptional()
  @IsPositive()
  totalFloor?: number;

  @IsOptional()
  @IsNotEmpty({ each: true })
  images?: string[];

  @IsOptional()
  features?: Feature[];

  @IsOptional()
  @IsNotEmpty({ each: true })
  rules?: Rule[];

  @IsOptional()
  @IsPositive({ each: true })
  facilityIds?: number[];
}
