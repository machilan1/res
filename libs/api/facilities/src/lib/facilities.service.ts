import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Database, PG_CONNECTION, facility } from '@res/api-database';
import { CreateFacilityDto } from './dtos/create-facility.dto';
import { Facility } from './entities/facility.entity';
import { PostgresError } from 'postgres';

@Injectable()
export class FacilitiesService {
  constructor(@Inject(PG_CONNECTION) private conn: Database) {}

  async create(createFacilityDto: CreateFacilityDto) {
    try {
      const [res] = await this.conn
        .insert(facility)
        .values(createFacilityDto)
        .returning();
      return new Facility(res);
    } catch (err) {
      if (err instanceof PostgresError && err.code === '23505') {
        throw new ConflictException('Duplicated facility name');
      }
      return;
    }
  }
}
