import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const sql = postgres({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '2003',
  database: 'testAUIS',
});

const db = drizzle(sql);

export default db;
