import { Transform } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

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
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [parseInt(value)];
    } else {
      return value.map((entry) => parseInt(entry));
    }
  })
  @IsPositive({ each: true })
  facilityIds?: number[];

  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => parseInt(value))
  limit?: number;

  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value))
  page?: number;

  get limitParam() {
    return this.limit ? (this.limit > 100 ? 100 : this.limit) : 20;
  }

  get pageParam() {
    return this.page ? this.page : 0;
  }
}
