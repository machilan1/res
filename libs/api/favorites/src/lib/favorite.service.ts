import { ConflictException, Inject } from '@nestjs/common';
import { PG_CONNECTION, Database, favorite, student } from '@res/api-database';
import { CreateFavoriteDto } from './dtos/create-favorite.dto';
import { eq } from 'drizzle-orm';
import { Favorite } from './entities/favorite.entity';

export class FavoriteService {
  constructor(@Inject(PG_CONNECTION) private conn: Database) {}

  async create(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    const { studentNumber } = createFavoriteDto;

    const [studentRes] = await this.conn
      .select({ studentId: student.userId })
      .from(student)
      .where(eq(student.studentNumber, studentNumber));

    if (!studentRes.studentId) {
      throw new ConflictException();
    }

    const [res] = await this.conn
      .insert(favorite)
      .values({
        studentId: studentRes.studentId,
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
