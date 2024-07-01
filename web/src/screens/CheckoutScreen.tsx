import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const STRIPE_PUBLISHABLE_KEY = import.meta.env
  .VITE_CLERK_PUBLISHABLE_KEYSTRIPE_PUBLISH_KEY_DEV;

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${STRIPE_PUBLISHABLE_KEY}`);

function CheckoutScreen() {
  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    return await fetch("http://localhost:3000/api/stripe/create-checkout-session", {
      method: "POST",
      // add our own priceId here later for different products
      body: JSON.stringify({ priceId: "price_1PSHWRP464csY2UpYpxvB2tk" }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  // can be null to options.clientSecret or options.fetchClientSecret if you are performing an initial server-side render or when generating a static site.
  const options = { fetchClientSecret };
  console.log(options);

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

export default CheckoutScreen;
