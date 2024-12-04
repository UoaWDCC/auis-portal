import { useCallback, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useLocation } from "react-router";
import { fetchEventOrMembershipCheckoutSecret } from "../api/apiRequests";
import CheckoutInformationScreen from "./CheckoutInformationScreen";
import axios from "axios";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${STRIPE_PUBLISHABLE_KEY}`);
let bodyData = { priceId: "" };
let isTicket = { isTicket: true };
let ticketId = { ticketId: -1 };

function CheckoutScreen({ stripeKey }: { stripeKey?: string }) {
  if (stripeKey) {
    bodyData = { priceId: stripeKey };
  }
  const location = useLocation();

  const [infoEntered, setInfoEntered] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("I DI A THING");
    // onSubmit(event.target)
    console.log(event.target);
    // setInfoEntered(true);
  };

  // const onSubmit = async (data: any) => {
  //   try {
  //     const response = await axios.post("/api/user/user-ticket-info", data, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.status === 200) {
  //       //Form Submission Successful
  //     } else {
  //       // Form Submission Failed
  //     }
  //   } catch (error) {
  //     // Error
  //   }
  // };

  if (location.state.data) {
    bodyData = { priceId: location.state.data.priceId };
    isTicket = { isTicket: location.state.data.isTicket };
    ticketId = { ticketId: location.state.data.ticketId };
  }
  console.log(location.state.data);

  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    return await fetchEventOrMembershipCheckoutSecret(bodyData);
  }, []);

  // can be null to options.clientSecret or options.fetchClientSecret if you are performing an initial server-side render or when generating a static site.
  const options = { fetchClientSecret };

  return (
    <div className="max-w-screen from-AUIS-dark-teal to-AUIS-teal min-h-screen bg-gradient-to-b">
      <div className="flex flex-col items-center text-center">
        <h1 className="my-12 text-5xl font-bold text-white">Payment</h1>
      </div>
      <div className="item flex justify-center">
        <div
          className={`drop-shadow-all mb-12 flex w-[68rem] items-center justify-center rounded-lg bg-white p-5 ${isTicket.isTicket && !infoEntered ? "hidden" : "flex"}`}
        >
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout className="flex flex-grow" />
          </EmbeddedCheckoutProvider>
        </div>
        <div
          className={` ${isTicket.isTicket && !infoEntered ? "flex" : "hidden"}`}
        >
          <CheckoutInformationScreen
            ticketId={ticketId.ticketId}
            handleSubmita={(e) => handleSubmit(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutScreen;
