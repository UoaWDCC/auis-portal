import { loadStripe } from "@stripe/stripe-js";

//import the key from the env
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

//This is where we load the stripe key, then export it.
export const stripeKey = await loadStripe(`${STRIPE_PUBLISHABLE_KEY}`);
