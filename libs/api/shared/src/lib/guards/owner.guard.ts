import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  Database,
  PG_CONNECTION,
  favorite,
  landlord,
  renting,
  rentingRecord,
  user,
} from '@res/api-database';
import { eq, and, isNull } from 'drizzle-orm';
import { USER } from '../constants/context-meta.constant';
import { OWNER_OF_RESOURCE } from '../constants/reflector.constant';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(PG_CONNECTION) private conn: Database,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const material: string = this.reflector.getAllAndOverride(
      OWNER_OF_RESOURCE,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();

    const params = request.params;

    const userId = request[USER].userId;

    const role = request[USER].role;

    if (role === 'admin') {
      return true;
    }

    if (!material) {
      throw new UnauthorizedException();
    }

    switch (material) {
      case 'rentings':
        return this.checkRentingOwner(+params.rentingId, userId);
      case 'students':
        return this.checkStudentOwner(+params.studentId, userId);
      case 'landlords':
        return this.checkLandlordOwner(+params.landlordId, userId);
      case 'renting-records':
        return this.checkRentingRecordOwner(+params.rentingRecordId, userId);
      case 'favorites':
        return this.checkFavoriteOwner(+params.favoriteId, userId);
      default:
        return false;
    }
  }

  private async checkRentingOwner(
    rentingId: number,
    userId: number,
  ): Promise<boolean> {
    const [res] = await this.conn
      .select()
      .from(renting)
      .where(
        and(
          eq(renting.landlordId, userId),
          eq(renting.rentingId, rentingId),
          isNull(renting.deletedAt),
        ),
      );

    if (!res) {
      return false;
    }

    return true;
  }

  private async checkStudentOwner(studentId: number, userId: number) {
    return studentId === userId;
  }

  private async checkLandlordOwner(landlordId: number, userId: number) {
    return landlordId === userId;
  }

  private async checkRentingRecordOwner(
    rentingRecordId: number,
    landlordId: number,
  ) {
    const res = await this.conn.query.rentingRecord.findFirst({
      with: { renting: { columns: { landlordId: true } } },
      where: and(
        eq(rentingRecord.rentingRecordId, rentingRecordId),
        isNull(rentingRecord.deletedAt),
      ),
    });

    if (!res) {
      return false;
    }

    return res.renting.landlordId === landlordId;
  }

  private async checkFavoriteOwner(favoriteId: number, studentId: number) {
    const res = await this.conn.query.favorite.findFirst({
      where: and(
        eq(favorite.favoriteId, favoriteId),
        eq(favorite.studentId, studentId),
        isNull(favorite.deletedAt),
      ),
    });

    if (!res) {
      return false;
    }

    return true;
  }
}
