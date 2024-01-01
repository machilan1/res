import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Database,
  PG_CONNECTION,
  renting,
  rentingRecord,
} from '@res/api-database';
import { CreateRentingRecordDto } from './dtos/create-renting-record.dto';
import { eq } from 'drizzle-orm';
import { FAIL_TO_CREATE } from '@res/api-shared';

@Injectable()
export class RentingRecordsService {
  constructor(@Inject(PG_CONNECTION) private conn: Database) {}

  async create(createRentingRecordDto: CreateRentingRecordDto) {
    const [check] = await this.conn
      .select({ isRented: renting.isRented })
      .from(renting)
      .where(eq(renting.rentingId, createRentingRecordDto.rentingId));

    if (!check) {
      throw new NotFoundException('Renting not found');
    }

    if (check.isRented) {
      throw new BadRequestException('Renting is unavailable now');
    }

    let res;

    try {
      res = await this.conn.transaction(async (tx) => {
        const res = await tx
          .insert(rentingRecord)
          .values(createRentingRecordDto)
          .returning();

        await tx
          .update(renting)
          .set({ isRented: true })
          .where(eq(renting.rentingId, createRentingRecordDto.rentingId));

        return res;
      });
    } catch (err) {
      throw new BadRequestException(FAIL_TO_CREATE);
    }

    return res;
  }

  async delete(rentingRecordId: number) {
    const res = await this.conn.transaction(async (tx) => {
      const updateRes = await tx
        .update(rentingRecord)
        .set({ deletedAt: new Date() })
        .where(eq(rentingRecord.rentingRecordId, rentingRecordId))
        .returning();

      await tx.update(renting).set({ isRented: false }).returning();

      return updateRes;
    });

    return res;
  }
}
