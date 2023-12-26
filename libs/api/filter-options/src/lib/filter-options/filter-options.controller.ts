import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilterOption } from './entity/filter-option.entity';
import { FilterOptionsService } from './filter-options.service';

@ApiTags('filter-options')
@Controller('filter-options')
export class FilterOptionsController {
  constructor(private filterOptionService: FilterOptionsService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'getFilterOptions' })
  async getFilterOptions(): Promise<FilterOption> {
    const res = await this.filterOptionService.getFilterOptions();
    return res;
  }
}
