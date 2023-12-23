import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

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
  role: roleEnum('role').notNull(),
});

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
});

export const admin = pgTable('admin', {
  userId: integer('user_id')
    .references(() => user.userId)
    .notNull()
    .primaryKey(),
});

export const campus = pgTable('campus', {
  campusId: bigserial('campus_id', { mode: 'number' }).primaryKey().notNull(),
  name: text('name').notNull(),
});

export const type = pgTable('type', {
  typeId: bigserial('type_id', { mode: 'number' }).primaryKey().notNull(),
  name: text('name').notNull(),
});

export const rule = pgTable('rule', {
  ruleId: bigserial('rule_id', { mode: 'number' }).primaryKey().notNull(),
  content: text('content').notNull(),
});

export const renting = pgTable('renting', {
  rentingId: bigserial('renting_id', { mode: 'number' }).primaryKey().notNull(),
  typeId: integer('type_id')
    .references(() => type.typeId)
    .notNull(),
  landlordId: integer('landlord_id').references(() => landlord.userId),
  campusId: integer('campus_id').references(() => campus.campusId),
  address: text('address').notNull(),
  price: integer('price').notNull(),
  title: text('title').notNull(),
  images: jsonb('images').$type<string[]>().default([]).notNull(),
  square: integer('square').notNull(),
  floor: integer('floor').notNull(),
  totalFloor: integer('total_floor').notNull(),
  isRented: boolean('is_rented').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

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
  action: recordActionEnum('action').notNull(),
});

export const rentingFacility = pgTable('renting_facility', {
  rentingFacilityId: bigserial('renting_facility_id', { mode: 'number' })
    .primaryKey()
    .notNull(),
  facilityId: integer('dacility_id')
    .references(() => facility.facilityId)
    .notNull(),
  rentingId: integer('renting_id')
    .references(() => renting.rentingId)
    .notNull(),
});

export const facility = pgTable('facility', {
  facilityId: bigserial('facility_id', { mode: 'number' })
    .notNull()
    .primaryKey(),
  name: text('name').notNull(),
  icon: text('icon').notNull(),
  isTag: boolean('is_tag').notNull(),
});

export const feature = pgTable('feature', {
  featureId: bigserial('feature_id', { mode: 'number' }).notNull().primaryKey(),
  caseId: integer('case_id')
    .references(() => renting.rentingId)
    .notNull(),
});

export const favorite = pgTable('favorite', {
  favoriteId: bigserial('favorite_id', { mode: 'number' })
    .primaryKey()
    .notNull(),
  studentId: integer('student_id')
    .references(() => user.userId)
    .notNull(),
  caseId: integer('case_id')
    .references(() => renting.rentingId)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
