import { ApiHideProperty } from '@nestjs/swagger';

export class PaginationDto<T> {
  @ApiHideProperty()
  data!: T[];

  meta!: { page: number; limit: number; total: number };

  constructor(data: PaginationDto<T>) {
    Object.assign(this, data);
  }
}
