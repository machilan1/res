import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateLandlordDto } from './dtos/update-landlord.dto';
import {
  Database,
  PG_CONNECTION,
  landlord,
  renting,
  user,
} from '@res/api-database';

import { GetLandlordsParam } from './dtos/get-landlord-param.dto';
import { and, eq, isNull } from 'drizzle-orm';
import { USER_NOT_FOUND_ERROR_MSG } from '@res/api-shared';

@Injectable()
export class LandlordService {
  constructor(@Inject(PG_CONNECTION) private conn: Database) {}

  async getLandlords(params: GetLandlordsParam) {
    const res = await this.conn.query.landlord.findMany({
      with: { user: true, rentings: { where: isNull(renting.deletedAt) } },
      limit: params.limit,
      offset: params.offset,
      columns: {
        banned: true,
        contactTimeEnd: true,
        contactTimeStart: true,
        email: true,
        userId: true,
      },
      where: isNull(landlord.deletedAt),
    });

    return res;
  }

  async getLandlordById(landlordId: number) {
    const res = await this.conn.query.landlord.findFirst({
      with: { user: true, rentings: true },
      where: and(eq(landlord.userId, landlordId), isNull(landlord.deletedAt)),
    });

    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  async updateLandlord(landlordId: number, body: UpdateLandlordDto) {
    const { name, phone } = body;
    const { email, banned, contactTimeStart, contactTimeEnd } = body;

    try {
      await this.conn.transaction(async (tx) => {
        if (name || phone) {
          await tx
            .update(user)
            .set({ name, phone })
            .where(eq(user.userId, landlordId))
            .returning();
        }

        if (email || banned || contactTimeEnd || contactTimeStart) {
          await tx
            .update(landlord)
            .set({ email, banned, contactTimeEnd, contactTimeStart })
            .where(
              and(eq(landlord.userId, landlordId), isNull(landlord.deletedAt)),
            );
        }
      });
    } catch (err) {
      console.log('---updateLandlord');
      console.log(err);
      throw new BadRequestException();
    }
  }

  async deleteLandlord(landlordId: number) {
    const res = await this.conn
      .update(landlord)
      .set({ deletedAt: new Date() })
      .where(and(eq(landlord.userId, landlordId), isNull(landlord.deletedAt)))
      .returning();

    if (!res || res.length === 0) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR_MSG);
    }
  }
}
