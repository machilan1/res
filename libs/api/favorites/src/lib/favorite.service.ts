import { BadRequestException, ConflictException, Inject } from '@nestjs/common';
import { PG_CONNECTION, Database, favorite, student } from '@res/api-database';
import { CreateFavoriteDto } from './dtos/create-favorite.dto';
import { eq } from 'drizzle-orm';
import { Favorite } from './entities/favorite.entity';

export class FavoriteService {
  constructor(@Inject(PG_CONNECTION) private conn: Database) {}

  async create(
    userId: number,
    createFavoriteDto: CreateFavoriteDto
  ): Promise<Favorite> {
    const [numberRes] = await this.conn
      .select({ studentNumber: student.studentNumber })
      .from(student)
      .where(eq(student.userId, userId));

    const { studentNumber } = numberRes;

    if (!studentNumber) {
      throw new ConflictException();
    }

    const [res] = await this.conn
      .insert(favorite)
      .values({
        studentId: userId,
        rentingId: createFavoriteDto.rentingId,
      })
      .returning();

    return new Favorite(res);
  }

  async delete(favoriteId: number): Promise<Favorite> {
    const [res] = await this.conn
      .update(favorite)
      .set({ deletedAt: new Date() })
      .where(eq(favorite.favoriteId, favoriteId))
      .returning();

    return new Favorite(res);
  }
}
