import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateLandlordDto } from './dtos/update-landlord.dto';
import { Database, PG_CONNECTION, landlord, user } from '@res/api-database';

import { GetLandlordsParam } from './dtos/get-landlord-param.dto';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '@res/shared';
import { eq, isNull } from 'drizzle-orm';

@Injectable()
export class LandlordService {
  constructor(@Inject(PG_CONNECTION) private conn: Database) {}

  async getLandlords(params: GetLandlordsParam) {
    const res = await this.conn.query.landlord.findMany({
      with: { user: true, rentings: true },
      limit: params.limit ?? DEFAULT_LIMIT,
      offset: params.offset ?? DEFAULT_OFFSET,
      columns: { banned: true, contactTime: true, email: true, userId: true },
      where: isNull(landlord.deletedAt),
    });

    return res;
  }

  async getLandlordById(landlordId: number) {
    const res = await this.conn.query.landlord.findFirst({
      with: { user: true, rentings: true },
      where: eq(landlord.userId, landlordId) && isNull(landlord.deletedAt),
    });

    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  async updateLandlord(landlordId: number, body: UpdateLandlordDto) {
    const { name, phone } = body;
    const { email, banned, contactTime } = body;

    try {
      await this.conn.transaction(async (tx) => {
        await tx
          .update(user)
          .set({ name, phone })
          .where(eq(user.userId, landlordId))
          .returning();
        await tx
          .update(landlord)
          .set({ email, banned, contactTime })
          .where(eq(landlord.userId, landlordId))
          .returning();
      });
    } catch (err) {
      console.log('---updateLandlord');
      console.log(err);
      throw new ConflictException();
    }
  }

  async deleteLandlord(landlordId: number) {
    await this.conn
      .update(landlord)
      .set({ deletedAt: new Date() })
      .where(eq(user.userId, landlordId));
  }
}
