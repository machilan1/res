import {
  BadRequestException,
  CanActivate,
  ConflictException,
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
  renting,
  rentingRecord,
} from '@res/api-database';
import { eq } from 'drizzle-orm';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(PG_CONNECTION) private conn: Database,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const material: string = this.reflector.getAllAndOverride(
      'ownershipOfResource',
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();

    const params = request.params;

    const userId = request['user'].userId;

    const role = request['user'].role;

    if (role === 'admin') {
      return true;
    }

    console.log(params);
    console.log(material);

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
      .where(eq(renting.landlordId, userId));

    return res.rentingId === rentingId;
  }

  private async checkStudentOwner(studentId: number, userId: number) {
    return studentId === userId;
  }

  private async checkLandlordOwner(landlordId: number, userId: number) {
    return landlordId === userId;
  }
  private async checkRentingRecordOwner(
    rentingRecordId: number,
    userId: number,
  ) {
    const res = await this.conn.query.rentingRecord.findFirst({
      with: { renting: { columns: { landlordId: true } } },
      where: eq(rentingRecord.rentingRecordId, rentingRecordId),
    });

    if (!res) {
      return false;
    }

    return res?.renting.landlordId === userId;
  }

  private async checkFavoriteOwner(favoriteId: number, userId: number) {
    const res = await this.conn.query.favorite.findFirst({
      where: eq(favorite.favoriteId, favoriteId),
    });

    if (!res) {
      return false;
    }

    return res.studentId === userId;
  }
}
