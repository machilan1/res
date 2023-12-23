import { Controller, Get } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@ApiProperty('filter-options')
@Controller('filter-options')
export class FilterOptionsController {
  @Get()
  getFilterOptions() {
    return 'All filter-options';
  }
}
