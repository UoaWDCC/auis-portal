import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
} from "./env";
import * as schema from "../../schemas/schema";

const sql = postgres({
  host: DATABASE_HOST,
  port: Number(DATABASE_PORT),
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  //database: "AUIS",
});

export const db = drizzle(sql, { schema });
