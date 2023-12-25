import { Transform } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class GetRentingsParam {
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [parseInt(value)];
    } else {
      return value.map((entry) => parseInt(entry));
    }
  })
  @IsPositive({ each: true })
  houseTypeIds?: number[];

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [parseInt(value)];
    } else {
      return value.map((entry) => parseInt(entry));
    }
  })
  @IsPositive({ each: true })
  campusIds?: number[];

  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => parseInt(value))
  limit?: number;

  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => parseInt(value))
  offset?: number;
}
