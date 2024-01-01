import {
  BadRequestException,
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
  facility,
  landlord,
  user,
} from '@res/api-database';
import {
  and,
  count,
  desc,
  eq,
  inArray,
  isNotNull,
  isNull,
  sql,
} from 'drizzle-orm';
import { Renting } from './entity/rentings.entity';
import { UpdateRentingDto } from './dtos/update-renting.dto';
import { Rule } from './entity/local/rule.entity';
import { Campus } from './entity/local/campus.entity';
import { HouseType } from './entity/local/type.entity';
import { Facility } from './entity/local/facility.entity';
import { Feature } from './entity/local/feature.entity';
import { Landlord } from './entity/local/landlord.entity';
import { FAIL_TO_CREATE, FAIL_TO_UPDATE, PaginationDto } from '@res/api-shared';
import { calculateOffset } from './helper/offset-calc.helper';

@Injectable()
export class RentingService {
  constructor(@Inject(PG_CONNECTION) private conn: Database) {}

  async getRentings(params: GetRentingsParam): Promise<PaginationDto<Renting>> {
    const { limitParam, pageParam } = params;
    const subquery = this.conn
      .select({
        rentingId: rentingFacility.rentingId,
      })
      .from(rentingFacility)
      .groupBy(rentingFacility.rentingId)
      .$dynamic();
    if (params.facilityIds) {
      subquery
        .where(inArray(rentingFacility.facilityId, params.facilityIds))
        .having(eq(count(), params.facilityIds.length));
    }

    const countRes = this.conn
      .select({
        facilities: sql`json_agg(${facility})`,
      })
      .from(renting)
      .leftJoin(
        rentingFacility,
        eq(rentingFacility.rentingId, renting.rentingId),
      )
      .leftJoin(facility, eq(facility.facilityId, rentingFacility.facilityId))
      .leftJoin(campus, eq(campus.campusId, renting.campusId))
      .leftJoin(houseType, eq(houseType.houseTypeId, renting.houseTypeId))
      .groupBy(renting.rentingId)
      .$dynamic();

    const filter = [];
    filter.push(isNull(renting.deletedAt));
    filter.push(inArray(renting.rentingId, subquery));
    if (params.houseTypeIds) {
      filter.push(inArray(houseType.houseTypeId, params.houseTypeIds));
    }
    if (params.campusIds) {
      filter.push(inArray(campus.campusId, params.campusIds));
    }
    const filteredCount = (await countRes.where(and(...filter))).length;

    let offset;
    if (limitParam && pageParam) {
      offset = calculateOffset(filteredCount, limitParam, pageParam);
    } else {
      offset = 0;
    }

    const dataRes = this.conn
      .select({
        rentingId: renting.rentingId,
        title: renting.title,
        price: renting.price,
        address: renting.address,
        images: renting.images,
        campus: sql<Campus>` jsonb_build_object('campusId',${campus.campusId},'name',${campus.name})`,
        houseType: sql<HouseType>` jsonb_build_object('houseTypeId',${houseType.houseTypeId},'name',${houseType.name})`,
        square: renting.square,
        floor: renting.floor,
        totalFloor: renting.totalFloor,
        description: renting.description,
        rules: sql<
          Rule[]
        >`json_agg( DISTINCT  jsonb_build_object('content',${rule.content},'ruleId',${rule.ruleId}) )`,
        facilities: sql<Facility[]>`json_agg(${facility})`,
        features: sql<Feature[]>`json_agg(DISTINCT ${feature})`,
        createdAt: renting.createdAt,
        landlord: sql<Landlord>`jsonb_build_object('landlordId',${landlord.userId},'name',${user.name},'phone',${user.phone},'email',${landlord.email},'startTime',${landlord.contactTimeStart} ,'endTime',${landlord.contactTimeEnd},'banned',${landlord.banned})`,
        isRented: renting.isRented,
      })
      .from(renting)
      .leftJoin(
        rentingFacility,
        eq(rentingFacility.rentingId, renting.rentingId),
      )
      .leftJoin(facility, eq(facility.facilityId, rentingFacility.facilityId))
      .leftJoin(campus, eq(campus.campusId, renting.campusId))
      .leftJoin(houseType, eq(houseType.houseTypeId, renting.houseTypeId))
      .leftJoin(rule, eq(rule.rentingId, renting.rentingId))
      .leftJoin(landlord, eq(landlord.userId, renting.landlordId))
      .leftJoin(user, eq(user.userId, landlord.userId))
      .leftJoin(feature, eq(feature.rentingId, renting.rentingId))
      .orderBy(desc(renting.createdAt))
      .groupBy(
        renting.rentingId,
        campus.campusId,
        houseType.houseTypeId,
        landlord.userId,
        user.userId,
      )
      .limit(limitParam)
      .offset(offset)
      .$dynamic();

    const temp = await dataRes.where(and(...filter));

    const filterRes = temp.map(
      (entry) =>
        new Renting({
          ...entry,
          campus: entry.campus!,
          houseType: entry.houseType!,
          landlord: entry.landlord!,
        }),
    );

    const res = new PaginationDto<Renting>({
      data: filterRes,
      meta: { limit: limitParam, page: pageParam, total: filteredCount },
    });

    return res;
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
      where: and(
        eq(renting.rentingId, rentingId),
        isNotNull(renting.deletedAt),
      ),
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
        startTime: res.landlord!.contactTimeStart,
        endTime: res.landlord!.contactTimeEnd,
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

    const rentingRes = await this.conn.transaction(async (tx) => {
      const [rentingRes] = await tx
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
          landlordId: landlordId,
        })
        .returning();

      const { features, rules, facilityIds } = body;

      if (features && features.length > 0) {
        await tx.insert(feature).values([
          ...features.map((entry) => ({
            name: entry,
            rentingId: rentingRes.rentingId,
          })),
        ]);
      }

      if (rules && rules.length > 0) {
        await tx.insert(rule).values([
          ...rules.map((entry) => ({
            content: entry,
            rentingId: rentingRes.rentingId,
          })),
        ]);
      }

      if (facilityIds && facilityIds.length > 0) {
        await tx.insert(rentingFacility).values([
          ...facilityIds.map((entry) => ({
            facilityId: entry,
            rentingId: rentingRes.rentingId,
          })),
        ]);
      }

      return rentingRes;
    });

    return rentingRes;
  }

  async updateRenting(rentingId: number, body: UpdateRentingDto) {
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
        .where(eq(renting.rentingId, rentingId))
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
                eq(feature.rentingId, rentingId),
              ),
            ),
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
              and(eq(rule.ruleId, entry.ruleId), eq(rule.rentingId, rentingId)),
            ),
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
        throw new BadRequestException(FAIL_TO_UPDATE);
      }
    }

    try {
      await Promise.all(updates);
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
