import { Type } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class PaginationDto<T> {
  @ApiHideProperty()
  data!: T[];

  meta!: { page: number; limit: number; total: number };

  constructor(data: PaginationDto<T>) {
    Object.assign(data);
  }
}
