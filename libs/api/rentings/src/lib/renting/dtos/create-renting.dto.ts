import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  RENTING_ADDRESS_MAX_LENGTH,
  RENTING_DESCRIPTION_MAX_LENGTH,
  RENTING_TITLE_MAX_LENGTH,
} from '@res/shared';

export class CreateRentingDto {
  @IsNotEmpty()
  @MaxLength(RENTING_TITLE_MAX_LENGTH)
  title!: string;

  @IsNotEmpty()
  @MaxLength(RENTING_DESCRIPTION_MAX_LENGTH)
  description!: string;

  @IsPositive()
  houseTypeId!: number;

  @IsPositive()
  campusId!: number;

  @IsNotEmpty()
  @MaxLength(RENTING_ADDRESS_MAX_LENGTH)
  address!: string;

  @IsPositive()
  price!: number;

  @IsPositive()
  square!: number;

  @IsPositive()
  floor!: number;

  @IsPositive()
  totalFloor!: number;

  @IsOptional()
  @MinLength(1, { each: true })
  images?: string[] | undefined;

  @IsOptional()
  @MinLength(1, { each: true })
  features?: string[] | undefined;

  @IsOptional()
  @MinLength(1, { each: true })
  rules?: string[] | undefined;

  @IsOptional()
  @IsArray()
  @IsPositive({ each: true })
  facilityIds?: number[] | undefined;
}
