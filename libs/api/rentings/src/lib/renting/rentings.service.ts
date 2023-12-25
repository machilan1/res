import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRentingDto } from './dtos/create-renting.dto';
import { GetRentingsParam } from './dtos/get-rentings-param.dto';
import {
  PG_CONNECTION,
  Database,
  houseType,
  campus,
  renting,
  InsertRenting,
  feature,
  rule,
  rentingFacility,
} from '@res/api-database';
import { SQLWrapper, and, eq, inArray, isNull } from 'drizzle-orm';
import { Renting } from './entity/rentings.entity';
import { UpdateRentingDto } from './dtos/update-renting.dto';

@Injectable()
export class RentingService {
  constructor(@Inject(PG_CONNECTION) private conn: Database) {}

  async getRentings(params: GetRentingsParam): Promise<Renting[]> {
    const conditions: SQLWrapper[] = [];

    if (params.houseTypeIds) {
      conditions.push(inArray(houseType.houseTypeId, params.houseTypeIds));
    }

    if (params.campusIds) {
      conditions.push(inArray(campus.campusId, params.campusIds));
    }

    conditions.push(isNull(renting.deletedAt));

    const res = await this.conn.query.renting.findMany({
      with: {
        facilities: { with: { facility: true } },
        landlord: { with: { user: true } },
        features: true,
        campus: true,
        rules: true,
        houseType: true,
      },
      limit: params.limit,
      offset: params.offset,
      where: and(...conditions),
    });

    return res.map(
      (entry) =>
        new Renting({
          ...entry,
          campus: entry.campus!,
          facilities: entry.facilities.map((entry) => ({
            facilityId: entry.facilityId,
            icon: entry.facility.icon,
            name: entry.facility.name,
          })),
          landlord: {
            landlordId: entry.landlord!.userId,
            name: entry.landlord!.user.name,
            startTime: entry.landlord!.contactTime!.start,
            endTime: entry.landlord!.contactTime!.end,
            phone: entry.landlord!.user.phone,
            email: entry.landlord!.email,
            banned: entry.landlord!.banned,
          },
        })
    );
  }

  async getRentingById(rentingId: number): Promise<Renting> {
    const res = await this.conn.query.renting.findFirst({
      with: {
        facilities: { with: { facility: true } },
        landlord: { with: { user: true } },
        features: true,
        campus: true,
        rules: true,
        houseType: true,
      },
      where: eq(renting.rentingId, rentingId),
    });
    if (!res) {
      throw new NotFoundException();
    }

    return new Renting({
      ...res,
      facilities: res.facilities.map((entry) => ({
        facilityId: entry.facilityId,
        name: entry.facility.name,
        icon: entry.facility.icon,
      })),
      landlord: {
        landlordId: res.landlord!.userId,
        name: res.landlord!.user.name,
        startTime: res.landlord!.contactTime!.start,
        endTime: res.landlord!.contactTime!.end,
        phone: res.landlord!.user.phone,
        email: res.landlord!.email,
        banned: res.landlord!.banned,
      },
    });
  }

  async createRenting(landlordId: number, body: CreateRentingDto) {
    const {
      campusId,
      houseTypeId,
      description,
      address,
      price,
      title,
      square,
      floor,
      totalFloor,
      images,
    }: Omit<InsertRenting, 'landlordId'> = body;

    const [rentingRes] = await this.conn
      .insert(renting)
      .values({
        campusId,
        houseTypeId,
        description,
        address,
        price,
        title,
        square,
        floor,
        totalFloor,
        images,
        landlordId,
      })
      .returning();

    const { features, rules, facilityIds } = body;
    const inserts = [];

    if (features && features.length > 0) {
      inserts.push(
        this.conn.insert(feature).values([
          ...features.map((entry) => ({
            name: entry,
            rentingId: rentingRes.rentingId,
          })),
        ])
      );
    }

    if (rules && rules.length > 0) {
      inserts.push(
        this.conn.insert(rule).values([
          ...rules.map((entry) => ({
            content: entry,
            rentingId: rentingRes.rentingId,
          })),
        ])
      );
    }

    if (facilityIds && facilityIds.length > 0) {
      inserts.push(
        this.conn.insert(rentingFacility).values([
          ...facilityIds.map((entry) => ({
            facilityId: entry,
            rentingId: rentingRes.rentingId,
          })),
        ])
      );
    }

    try {
      await Promise.all(inserts);
    } catch (err) {
      console.log(err);
      throw new ConflictException();
    }

    return rentingRes;
  }

  async updateRenting(
    updaterId: number,
    rentingId: number,
    body: UpdateRentingDto
  ) {
    const {
      campusId,
      typeId: houseTypeId,
      description,
      address,
      price,
      title,
      square,
      floor,
      totalFloor,
      images,
    } = body;

    const updates = [];

    const { features, rules, facilityIds } = body;

    let res;
    if (
      campusId ||
      houseTypeId ||
      description ||
      address ||
      price ||
      title ||
      square ||
      floor ||
      totalFloor ||
      images
    ) {
      res = await this.conn
        .update(renting)
        .set({
          campusId,
          houseTypeId,
          description,
          address,
          price,
          title,
          square,
          floor,
          totalFloor,
          images,
        })
        .where(eq(renting.landlordId, updaterId))
        .returning();
    }

    if (features) {
      features.forEach((entry) => {
        updates.push(
          this.conn
            .update(feature)
            .set(entry)
            .where(
              and(
                eq(feature.featureId, entry.featureId),
                eq(feature.rentingId, rentingId)
              )
            )
        );
      });
    }

    if (rules) {
      rules.forEach((entry) => {
        updates.push(
          this.conn
            .update(rule)
            .set(entry)
            .where(
              and(eq(rule.ruleId, entry.ruleId), eq(rule.rentingId, rentingId))
            )
        );
      });
    }

    if (facilityIds) {
      try {
        await this.conn
          .delete(rentingFacility)
          .where(eq(rentingFacility.rentingId, rentingId));

        await this.conn.insert(rentingFacility).values([
          ...facilityIds.map((entry) => ({
            rentingId,
            facilityId: entry,
          })),
        ]);
      } catch (err) {
        throw new ConflictException();
      }
    }

    try {
      const res = await Promise.all(updates);
    } catch (err) {
      console.log(err);
    }

    return res;
  }

  async deleteRenting(rentingId: number) {
    const [res] = await this.conn
      .update(renting)
      .set({ deletedAt: new Date() })
      .where(and(eq(renting.rentingId, rentingId), isNull(renting.deletedAt)))
      .returning();

    if (!res) {
      throw new NotFoundException();
    }

    return res;
  }
}
