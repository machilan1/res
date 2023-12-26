import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
import { faker } from '@faker-js/faker';
import { hashSync } from 'bcrypt';
import { sql } from 'drizzle-orm';
import { main as migrate } from '../migrate';
import { InsertUser, user } from '../schema';

const PASSWORD = '123456';
const PASSWORD_HASH = hashSync(PASSWORD, 12);

async function main() {
  const env = dotenv.config();
  expand(env);
  console.log('Migration Start');

  const dbUrl = process.env['DB_URL'];
  const pool = new Pool({
    connectionString: dbUrl,
  });
  const db = drizzle(pool);

  // Reset all data
  // 1. sql -> db delete
  // console.log(__dirname);
  // await db.execute(sql`drop database db`);
  // 2. sql -> migrate
  await migrate();

  // 3. seed ur data

  await pool.end();
  process.exit(0);
}

async function seedHouseType(houseTypes: string[]) {
  console.log('Seeding house types...');
  const arr = houseTypes;

  console.log('Seeding house types completed');
}

main();
