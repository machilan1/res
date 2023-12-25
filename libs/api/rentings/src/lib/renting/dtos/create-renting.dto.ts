import { IsArray, IsOptional, IsPositive, MinLength } from 'class-validator';

export class CreateRentingDto {
  title!: string;
  description!: string;
  houseTypeId!: number;
  campusId!: number;
  // landlordId!: number;
  address!: string;
  price!: number;
  square!: number;
  floor!: number;
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
