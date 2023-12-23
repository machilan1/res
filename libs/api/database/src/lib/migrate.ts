import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import * as dotenv from 'dotenv';
import { expand } from 'dotenv-expand';

async function main() {
  const env = dotenv.config();
  expand(env);
  console.log('Migration Start');

  const dbUrl = process.env['DB_URL'];
  const pool = new Pool({
    connectionString: dbUrl,
  });
  const db = drizzle(pool);
  const dir = __dirname + '/migration';
  await migrate(db, {
    migrationsFolder: dir,
  });

  console.log('Migration completed');
  await pool.end();
  process.exit(0);
}

main();
