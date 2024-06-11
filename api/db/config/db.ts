import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const sql = postgres({
  host: "localhost",
  port: 5433,
  user: "AUIS",
  password: "GuryIsGoat",
  database: "AUIS",
});

export const db = drizzle(sql);
