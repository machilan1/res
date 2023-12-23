import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterOptionsService {
  getFilterOptions() {
    return 'All filter-options';
  }
}
