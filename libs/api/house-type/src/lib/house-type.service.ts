import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Database, PG_CONNECTION, houseType } from '@res/api-database';
import { HouseType } from './entities/house-type.entity';
import { CreateHouseTypeDto } from './dtos/create-house-type.dto';
import { PostgresError } from 'postgres';
import { FAIL_TO_CREATE } from '@res/api-shared';

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
      throw new InternalServerErrorException(FAIL_TO_CREATE);
    }
  }
}
