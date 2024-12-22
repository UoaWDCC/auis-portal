import { useCallback, useEffect, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router";
// import { fetchEventOrMembershipCheckoutSecret } from "../api/apiRequests";
import CheckoutError from "@components/checkout-page/CheckoutError";
import { useEventOrMembershipCheckoutSecret } from "../hooks/api/useEventOrMembershipCheckoutSecret";
import LoadingSpinner from "@components/navigation/LoadingSpinner";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${STRIPE_PUBLISHABLE_KEY}`);
let bodyData: { priceId: string; userTicketId: number };
export default function CheckoutScreen() {
  const { data, mutateAsync, status } = useEventOrMembershipCheckoutSecret();
  const location = useLocation();
  const navigate = useNavigate();
  // ensure data required for checkout is here

  try {
    bodyData = {
      priceId: location.state.data.priceId,
      userTicketId: location.state.data.userTicketId,
      // priceId: "asdfa"
    };
  } catch {
    return <CheckoutError />;
  }

  useEffect(() => {
    mutateAsync(bodyData);
  }, []);

  console.log(data?.clientSecret);

  console.log(status);
  // // Stripe payments
  // const fetchClientSecret = useCallback(async () => {
  //   // Create a Checkout Session
  //   return await fetchEventOrMembershipCheckoutSecret(bodyData);
  // }, []);

  // can be null to options.clientSecret or options.fetchClientSecret if you are performing an initial server-side render or when generating a static site.
  // const options = { fetchClientSecret };

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (status === "error" || data?.clientSecret === undefined) {
    return (
      <div className="max-w-screen from-AUIS-dark-teal to-AUIS-teal min-h-screen bg-gradient-to-b">
        <div className="flex flex-col items-center text-center">
          <h1 className="my-12 text-5xl font-bold text-white">Checkout</h1>
        </div>
        <div className="item flex justify-center">
          <p className="pt-16 text-center text-xl text-white">
            Sorry an error occurred, please try again
            <br />
            This could be caused by ticket being sold out, or some other error
          </p>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-primary-orange mt-24 rounded-2xl px-10 py-3 text-3xl font-bold text-white transition-all hover:scale-110"
            onClick={() => {
              navigate("/");
            }}
          >
            Return to Home screen
          </button>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="max-w-screen from-AUIS-dark-teal to-AUIS-teal min-h-screen bg-gradient-to-b">
        <div className="flex flex-col items-center text-center">
          <h1 className="my-12 text-5xl font-bold text-white">Checkout</h1>
        </div>
        <div className="item flex justify-center">
          <div
            className={`drop-shadow-all mb-12 flex w-[40rem] items-center justify-center rounded-lg bg-white p-5 lg:w-[68rem]`}
          >
            <EmbeddedCheckoutProvider stripe={stripePromise} options={data}>
              <EmbeddedCheckout className="flex flex-grow" />
            </EmbeddedCheckoutProvider>
          </div>
        </div>
      </div>
    );
  }
}
