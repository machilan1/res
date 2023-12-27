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
  facility,
  landlord,
  user,
} from '@res/api-database';
import { and, count, desc, eq, inArray, isNull, sql } from 'drizzle-orm';
import { Renting } from './entity/rentings.entity';
import { UpdateRentingDto } from './dtos/update-renting.dto';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Pagination } from 'libs/api/shared/helpers/pagination';
import { Rule } from './entity/rule.entity';
import { Campus } from './entity/campus.entity';
import { HouseType } from './entity/type.entity';
import { Facility } from './entity/facility.entity';
import { Feature } from './entity/feature.entity';
import { Landlord } from './entity/landlord.entity';

@Injectable()
export class RentingService {
  constructor(@Inject(PG_CONNECTION) private conn: Database) {}

  async getRentings(params: GetRentingsParam): Promise<Pagination<Renting>> {
    let limit;
    let offset;

    const subquery = this.conn
      .select({
        rentingId: rentingFacility.rentingId,
        count: count(),
      })
      .from(rentingFacility)
      .groupBy(rentingFacility.rentingId)
      .$dynamic();

    if (params.facilityIds) {
      subquery
        .where(inArray(rentingFacility.facilityId, params.facilityIds))
        .having(eq(count(), params.facilityIds.length));
    }

    const subRes = await subquery;

    const filteredRentingIds = subRes.map((entry) => entry.rentingId);

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

    filter.push(inArray(renting.rentingId, filteredRentingIds));

    if (params.houseTypeIds) {
      filter.push(inArray(houseType.houseTypeId, params.houseTypeIds));
    }

    if (params.campusIds) {
      filter.push(inArray(campus.campusId, params.campusIds));
    }

    const afterFiltered = await countRes.where(and(...filter));

    const filteredCount = afterFiltered.length;

    if (params.limit) {
      limit = params.limit > 100 ? 100 : params.limit;
    } else {
      limit = 20;
    }

    let page = params.page ? params.page : 0;

    if (limit && page) {
      if (limit * (page + 1) > filteredCount) {
        page =
          filteredCount % limit === 0
            ? Math.floor(filteredCount / limit) - 1
            : Math.floor(filteredCount / limit);
        offset = limit * page;
      } else {
        offset = limit * page;
      }
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
        landlord: sql<Landlord>`jsonb_build_object('landlordId',${landlord.userId},'name',${user.name},'phone',${user.phone},'email',${landlord.email},'startTime',${landlord.contactTime} ->> 'start' ,'endTime',${landlord.contactTime} ->>'end','banned',${landlord.banned})`,
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
      .limit(limit)
      .offset(offset)
      .$dynamic();

    const filteredData = dataRes.where(and(...filter));

    const filteredRes = await filteredData;

    filteredRes.map(
      (entry) =>
        new Renting({
          ...entry,
          campus: entry.campus!,
          houseType: entry.houseType!,
          landlord: entry.landlord!,
        }),
    );
    return { data: filteredRes, meta: { limit, page, total: filteredCount } };
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
        landlordId:
          process.env['ENV'] === 'dev'
            ? 1 + Math.floor(Math.random() * 10)
            : landlordId,
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
        ]),
      );
    }

    if (rules && rules.length > 0) {
      inserts.push(
        this.conn.insert(rule).values([
          ...rules.map((entry) => ({
            content: entry,
            rentingId: rentingRes.rentingId,
          })),
        ]),
      );
    }

    if (facilityIds && facilityIds.length > 0) {
      inserts.push(
        this.conn.insert(rentingFacility).values([
          ...facilityIds.map((entry) => ({
            facilityId: entry,
            rentingId: rentingRes.rentingId,
          })),
        ]),
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
    body: UpdateRentingDto,
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
