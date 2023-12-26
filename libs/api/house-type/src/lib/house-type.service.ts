import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Database, PG_CONNECTION, houseType } from '@res/api-database';
import { HouseType } from './entities/house-type.entity';
import { CreateHouseTypeDto } from './dtos/create-house-type.dto';
import { PostgresError } from 'postgres';

@Injectable()
export class HouseTypeService {
  constructor(@Inject(PG_CONNECTION) private conn: Database) {}

  async create(createHouseTypeDto: CreateHouseTypeDto) {
    try {
      const [res] = await this.conn
        .insert(houseType)
        .values(createHouseTypeDto)
        .returning();

      return new HouseType(res);
    } catch (err) {
      if (err instanceof PostgresError && err.code === '23505') {
        throw new ConflictException('Duplicated house type.');
      }
      return;
    }
  }
}
