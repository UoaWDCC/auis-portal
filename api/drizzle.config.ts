import * as dotenv from "dotenv"
dotenv.config()
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./schemas/*",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  verbose: true,
  strict: true
})
