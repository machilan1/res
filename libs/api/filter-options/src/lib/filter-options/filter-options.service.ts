import { Inject, Injectable } from '@nestjs/common';
import {
  PG_CONNECTION,
  Database,
  campus,
  houseType,
  facility,
} from '@res/api-database';
import { FilterOption } from './entity/filter-option.entity';
import { Campus } from './entity/campus.entity';
import { HouseType } from './entity/type.entity';
import { Facility } from './entity/facility.entity';

@Injectable()
export class FilterOptionsService {
  constructor(@Inject(PG_CONNECTION) private conn: Database) {}

  async getFilterOptions(): Promise<FilterOption> {
    const campuses = await this.conn.select().from(campus);
    const types = await this.conn.select().from(houseType);
    const facilities = await this.conn.select().from(facility);

    return {
      campus: campuses.map((entry) => new Campus(entry)),
      houseType: types.map((entry) => new HouseType(entry)),
      facilities: facilities.map((entry) => new Facility(entry)),
    };
  }
}
