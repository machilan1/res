import { Inject, Injectable } from '@nestjs/common';
import {
  PG_CONNECTION,
  Database,
  campus,
  houseType,
  facility,
} from '@res/api-database';
import { FilterOption } from './entity/filter-option.entity';
import { isNull } from 'drizzle-orm';

@Injectable()
export class FilterOptionsService {
  constructor(@Inject(PG_CONNECTION) private conn: Database) {}

  async getFilterOptions(): Promise<FilterOption> {
    const res = await this.conn.transaction(async (tx) => {
      const campuses = await tx
        .select({ campusId: campus.campusId, name: campus.name })
        .from(campus)
        .where(isNull(campus.deletedAt));

      const houseTypes = await tx
        .select({ houseTypeId: houseType.houseTypeId, name: houseType.name })
        .from(houseType)
        .where(isNull(houseType.deletedAt));

      const facilities = await tx
        .select({
          facilityId: facility.facilityId,
          name: facility.name,
          icon: facility.icon,
        })
        .from(facility)
        .where(isNull(facility.deletedAt));

      return { campuses, houseTypes, facilities };
    });

    return res;
  }
}
