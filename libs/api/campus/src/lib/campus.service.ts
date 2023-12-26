import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Database, PG_CONNECTION, campus } from '@res/api-database';
import { CreateCampusDto } from './dtos/create-campus.dto';
import { Campus } from './entities/campus.entity';
import { PostgresError } from 'postgres';

@Injectable()
export class CampusService {
  constructor(@Inject(PG_CONNECTION) private conn: Database) {}

  async create(createCampusDto: CreateCampusDto) {
    try {
      const [res] = await this.conn
        .insert(campus)
        .values(createCampusDto)
        .returning();

      return new Campus(res);
    } catch (err) {
      if (err instanceof PostgresError && err.code === '23505') {
        throw new ConflictException('Duplicated campus name');
      }
      return;
    }
  }
}
