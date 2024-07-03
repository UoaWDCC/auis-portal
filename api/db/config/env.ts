import dotenv from "dotenv";

dotenv.config();
(function checkProcessEnvIntegrity() {
  if (!process.env.DATABASE_HOST) {
    throw Error(
      `.env: DATABASE_HOST is required. Received: "${process.env.DATABASE_HOST}"`
    );
  }
  if (!process.env.DATABASE_PORT) {
    throw new Error(
      `.env: DATABASE_PORT is required. Received: "${process.env.DATABASE_PORT}"`
    );
  }
  if (!process.env.DATABASE_USERNAME) {
    throw new Error(
      `.env: DATABASE_USERNAME is required. Received: "${process.env.DATABASE_USERNAME}"`
    );
  }
  if (!process.env.DATABASE_PASSWORD) {
    throw new Error(
      `.env: DATABASE_PASSWORD is required. Received: "${process.env.DATABASE_PASSWORD}"`
    );
  }
  if (!process.env.STRIPE_SECRET_TEST) {
    throw new Error(
      `.env: Stripe Secret (Test mode) is required. Received: "${process.env.STRIPE_SECRET_TEST}"`
    );
  }
})();

export const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  STRIPE_SECRET_TEST,
} = process.env;
