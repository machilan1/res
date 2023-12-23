import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('filter-options')
@Controller('filter-options')
export class FilterOptionsController {
  @Get()
  getFilterOptions() {
    return 'All filter-options';
  }
}
