import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${STRIPE_PUBLISHABLE_KEY}`);
let bodyData = { priceId: "price_1PSHWRP464csY2UpYpxvB2tk", eventId: 1 };

function CheckoutScreen({ stripeKey }: { stripeKey?: string }) {
  if (stripeKey) {
    bodyData = { priceId: stripeKey, eventId: 1 };
  }

  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    return await fetch("/api/stripe/create-event-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // add our own priceId here later for different products
      body: JSON.stringify(bodyData),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  // can be null to options.clientSecret or options.fetchClientSecret if you are performing an initial server-side render or when generating a static site.
  const options = { fetchClientSecret };

  return (
    <div className="max-w-screen from-AUIS-dark-teal to-AUIS-teal min-h-screen bg-gradient-to-b">
                  <div className="flex flex-col items-center text-center">
                  <h1 className="text-5xl font-bold my-12 text-white">Payment</h1>
                  </div>
      <div className=" flex item justify-center">
        <div className="w-[68rem] p-5 mb-12 drop-shadow-all bg-white rounded-lg flex items-center justify-center">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout className="flex flex-grow "  />
          </EmbeddedCheckoutProvider>
          </div>
          </div>
    </div>
  );
}

export default CheckoutScreen;
