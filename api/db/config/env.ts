import dotenv from "dotenv"

dotenv.config()
;(function checkProcessEnvIntegrity() {
  if (!process.env.DATABASE_HOST) {
    throw Error(
      `.env: DATABASE_HOST is required. Received: "${process.env.DATABASE_HOST}"`
    )
  }
  if (!process.env.DATABASE_PORT) {
    throw new Error(
      `.env: DATABASE_PORT is required. Received: "${process.env.DATABASE_PORT}"`
    )
  }
  if (!process.env.DATABASE_USERNAME) {
    throw new Error(
      `.env: DATABASE_USERNAME is required. Received: "${process.env.DATABASE_USERNAME}"`
    )
  }
  if (!process.env.DATABASE_PASSWORD) {
    throw new Error(
      `.env: DATABASE_PASSWORD is required. Received: "${process.env.DATABASE_PASSWORD}"`
    )
  }
})()

export const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD
} = process.env
