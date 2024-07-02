import { migrate } from "drizzle-orm/postgres-js/migrator"
import { db } from "../db/config/db"

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "./db/migrations"
    })

    console.log("Migration successful")
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()
