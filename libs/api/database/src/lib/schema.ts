import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';

import {
  bigserial,
  integer,
  pgTable,
  timestamp,
  text,
  pgEnum,
  boolean,
  jsonb,
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['student', 'landlord', 'admin']);
export const recordActionEnum = pgEnum('action', ['apply', 'dismiss']);

export const user = pgTable('app_user', {
  userId: bigserial('user_id', { mode: 'number' }).primaryKey().notNull(),
  name: text('name').notNull(),
  role: roleEnum('role').notNull(),
  phone: text('phone').notNull(),
  password: text('password').notNull(),
  refreshToken: text('refresh_token'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type SelectUser = InferSelectModel<typeof user>;
export type InsertUser = InferInsertModel<typeof user>;

export const student = pgTable('student', {
  userId: integer('user_id')
    .references(() => user.userId)
    .notNull()
    .primaryKey(),
  studentNumber: text('student_number').notNull().unique(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export const studentRelations = relations(student, ({ one, many }) => ({
  user: one(user, {
    fields: [student.userId],
    references: [user.userId],
  }),
  favorites: many(favorite),
}));

export type SelectStudent = InferSelectModel<typeof student>;
export type InsertStudent = InferInsertModel<typeof student>;

export const landlord = pgTable('landlord', {
  userId: integer('user_id')
    .references(() => user.userId)
    .notNull()
    .primaryKey(),
  email: text('email').notNull().unique(),
  banned: boolean('banned').default(false).notNull(),
  contactTime: jsonb('contact_time')
    .$type<{ start: number; end: number }>()
    .default({ start: 9, end: 21 }),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export type SelectLandlord = InferSelectModel<typeof landlord>;
export type InsertLandlord = InferInsertModel<typeof landlord>;

export const landlordRelations = relations(landlord, ({ one, many }) => ({
  user: one(user, {
    fields: [landlord.userId],
    references: [user.userId],
  }),
  rentings: many(renting),
}));

export const admin = pgTable('admin', {
  userId: integer('user_id')
    .references(() => user.userId)
    .notNull()
    .primaryKey(),
  email: text('email').notNull().unique(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export type SelectAdmin = InferSelectModel<typeof admin>;
export type InsertAdmin = InferInsertModel<typeof admin>;

export const adminRelations = relations(admin, ({ one }) => ({
  user: one(user, {
    fields: [admin.userId],
    references: [user.userId],
  }),
}));

export const campus = pgTable('campus', {
  campusId: bigserial('campus_id', { mode: 'number' }).primaryKey().notNull(),
  name: text('name').notNull().unique(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export type SelectCampus = InferSelectModel<typeof campus>;
export type InsertCampus = InferInsertModel<typeof campus>;

export const houseType = pgTable('house_type', {
  houseTypeId: bigserial('house_type_id', { mode: 'number' })
    .primaryKey()
    .notNull(),
  name: text('name').notNull().unique(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export type SelectHouseType = InferSelectModel<typeof houseType>;
export type InsertHouseType = InferInsertModel<typeof houseType>;

export const rule = pgTable('rule', {
  ruleId: bigserial('rule_id', { mode: 'number' }).primaryKey().notNull(),
  rentingId: integer('renting_id')
    .references(() => renting.rentingId)
    .notNull(),
  content: text('content').notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export type SelectRule = InferSelectModel<typeof rule>;
export type InsertRule = InferInsertModel<typeof rule>;

export const ruleRelations = relations(rule, ({ one }) => ({
  user: one(renting, {
    fields: [rule.rentingId],
    references: [renting.rentingId],
  }),
}));

export const renting = pgTable('renting', {
  rentingId: bigserial('renting_id', { mode: 'number' }).primaryKey().notNull(),
  houseTypeId: integer('house_type_id')
    .references(() => houseType.houseTypeId)
    .notNull(),
  landlordId: integer('landlord_id')
    .references(() => landlord.userId)
    .notNull(),
  campusId: integer('campus_id')
    .references(() => campus.campusId)
    .notNull(),
  address: text('address').notNull(),
  price: integer('price').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  images: jsonb('images').$type<string[]>().default([]).notNull(),
  square: integer('square').notNull(),
  floor: integer('floor').notNull(),
  totalFloor: integer('total_floor').notNull(),
  isRented: boolean('is_rented').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export type SelectRenting = InferSelectModel<typeof renting>;
export type InsertRenting = InferInsertModel<typeof renting>;

export const rentingRelations = relations(renting, ({ one, many }) => ({
  facilities: many(rentingFacility),
  features: many(feature),
  landlord: one(landlord, {
    fields: [renting.landlordId],
    references: [landlord.userId],
  }),
  houseType: one(houseType, {
    fields: [renting.houseTypeId],
    references: [houseType.houseTypeId],
  }),
  campus: one(campus, {
    fields: [renting.campusId],
    references: [campus.campusId],
  }),
  rules: many(rule),
  rentingRecords: many(rentingRecord),
}));

export const rentingRecord = pgTable('renting_record', {
  rentingRecordId: bigserial('renting_record_id', { mode: 'number' })
    .notNull()
    .primaryKey(),
  rentingId: integer('renting_id')
    .references(() => renting.rentingId)
    .notNull(),
  studentId: integer('student_id')
    .references(() => student.userId)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export type SelectRentingRecord = InferSelectModel<typeof rentingRecord>;
export type InsertRentingRecord = InferInsertModel<typeof rentingRecord>;

export const rentingRecordRelations = relations(rentingRecord, ({ one }) => ({
  renting: one(renting, {
    fields: [rentingRecord.rentingId],
    references: [renting.rentingId],
  }),
}));

export const rentingFacility = pgTable('renting_facility', {
  rentingFacilityId: bigserial('renting_facility_id', { mode: 'number' })
    .primaryKey()
    .notNull(),
  facilityId: integer('facility_id')
    .references(() => facility.facilityId)
    .notNull(),
  rentingId: integer('renting_id')
    .references(() => renting.rentingId)
    .notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export type SelectRentingFacility = InferSelectModel<typeof rentingFacility>;
export type InsertRentingFacility = InferInsertModel<typeof rentingFacility>;

export const rentingFacilityRelations = relations(
  rentingFacility,
  ({ one }) => ({
    renting: one(renting, {
      fields: [rentingFacility.rentingId],
      references: [renting.rentingId],
    }),
    facility: one(facility, {
      fields: [rentingFacility.facilityId],
      references: [facility.facilityId],
    }),
  }),
);

export const facility = pgTable('facility', {
  facilityId: bigserial('facility_id', { mode: 'number' })
    .notNull()
    .primaryKey(),
  name: text('name').notNull().unique(),
  icon: text('icon').notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export type SelectFacility = InferSelectModel<typeof facility>;
export type InsertFacility = InferInsertModel<typeof facility>;

export const feature = pgTable('feature', {
  featureId: bigserial('feature_id', { mode: 'number' }).notNull().primaryKey(),
  rentingId: integer('renting_id')
    .references(() => renting.rentingId)
    .notNull(),
  name: text('name').notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export const featureRelations = relations(feature, ({ one }) => ({
  user: one(renting, {
    fields: [feature.rentingId],
    references: [renting.rentingId],
  }),
}));

export type SelectFeature = InferSelectModel<typeof feature>;
export type InsertFeature = InferInsertModel<typeof feature>;

export const favorite = pgTable('favorite', {
  favoriteId: bigserial('favorite_id', { mode: 'number' })
    .primaryKey()
    .notNull(),
  studentId: integer('student_id')
    .references(() => user.userId)
    .notNull(),
  rentingId: integer('renting_id')
    .references(() => renting.rentingId)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export type SelectFavorite = InferSelectModel<typeof favorite>;
export type InsertFavorite = InferInsertModel<typeof favorite>;

export const favoriteRelations = relations(favorite, ({ one }) => ({
  renting: one(renting, {
    fields: [favorite.rentingId],
    references: [renting.rentingId],
  }),

  student: one(student, {
    fields: [favorite.studentId],
    references: [student.userId],
  }),
}));
