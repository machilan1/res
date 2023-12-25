import { Transform } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class GetLandlordsParam {
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => parseInt(value))
  limit?: number;

  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => parseInt(value))
  offset?: number;
}
