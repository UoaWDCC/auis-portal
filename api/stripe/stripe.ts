import Stripe from "stripe";

// StripeJS: Load secret API key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
  typescript: true,
});
