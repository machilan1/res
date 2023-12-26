import { IsArray, IsPositive } from 'class-validator';
export class FilterOptionsDto {
  @IsArray()
  @IsPositive({ each: true })
  campusIds!: number[];

  @IsArray()
  @IsPositive({ each: true })
  typeIds!: number[];

  minPrice!: number;
  maxPrice!: number;
  @IsArray()
  @IsPositive({ each: true })
  facilityIds!: number[];
}
