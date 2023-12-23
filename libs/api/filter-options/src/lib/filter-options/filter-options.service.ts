import { Injectable } from '@nestjs/common';

@Injectable()
export class FilterOptionsService {
  getFilterOptions() {
    return 'All filter-options';
  }
}
