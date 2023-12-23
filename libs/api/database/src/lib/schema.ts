import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  bigserial,
  integer,
  pgTable,
  timestamp,
  text,
  pgEnum,
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['student', 'landlord', 'admin']);

export const user = pgTable('app_user', {
  userId: bigserial('user_id', { mode: 'number' }).primaryKey().notNull(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  phone: text('phone').notNull(),
  role: roleEnum('role').notNull(),
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
  year: integer('year').notNull(),
  departmentId: integer('department_id')
    .references(() => department.departmentId)
    .notNull(),
  majorId: integer('major_id')
    .references(() => major.majorId)
    .notNull(),
});

export type SelectStudent = InferSelectModel<typeof student>;
export type InsertStudent = InferInsertModel<typeof student>;

export const department = pgTable('department', {
  departmentId: bigserial('department_id', { mode: 'number' })
    .primaryKey()
    .notNull(),
  name: text('name').notNull().unique(),
});

export const major = pgTable('major', {
  majorId: bigserial('major_id', { mode: 'number' }).primaryKey().notNull(),
  departmentId: integer('department_id')
    .references(() => department.departmentId)
    .notNull(),
  name: text('name').notNull().unique(),
});
