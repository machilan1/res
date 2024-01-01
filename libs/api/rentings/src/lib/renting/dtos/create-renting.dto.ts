import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  MaxLength,
} from 'class-validator';
import {
  RENTING_ADDRESS_MAX_LENGTH,
  RENTING_DESCRIPTION_MAX_LENGTH,
  RENTING_TITLE_MAX_LENGTH,
} from '@res/shared';
import { NotSmallerThan } from '@res/api-shared';

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
  @NotSmallerThan('floor')
  totalFloor!: number;

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  images?: string[] | undefined;

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  features?: string[] | undefined;

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  rules?: string[] | undefined;

  @IsOptional()
  @IsArray()
  @IsPositive({ each: true })
  facilityIds?: number[] | undefined;
}
