import { useCallback, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router";
import { fetchEventOrMembershipCheckoutSecret } from "../api/apiRequests";
// import CheckoutInformationScreen from "./CheckoutInformationScreen";
import axios from "axios";
import { PiRobotBold } from "react-icons/pi";
import CheckoutError from "@components/checkout-page/CheckoutError";
import CheckoutInformation from "@components/forms/CheckoutInformation";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${STRIPE_PUBLISHABLE_KEY}`);
let bodyData: { priceId: string };
let isTicket: { isTicket: boolean };
let ticketId: { ticketId: number };

function CheckoutScreen() {
  const location = useLocation();
  // const navigate = useNavigate();

  // ensure data required for checkout is here
  try {
    bodyData = { priceId: location.state.data.priceId };
    isTicket = { isTicket: location.state.data.isTicket };
    ticketId = { ticketId: location.state.data.ticketId };
  } catch {
    return <CheckoutError />;
  }

  // For switching between stripe and checkout questions
  // const [infoEntered, setInfoEntered] = useState(false);

  // const handleSubmit = (
  //   event: React.FormEvent<HTMLFormElement>,
  //   name: string,
  //   email: string,
  //   phoneNumber: string,
  //   answers: {
  //     questionId: number;
  //     answer: string;
  //   }[]
  // ) => {
  //   console.log("I DI A THING");
  //   // onSubmit(event.target)
  //   console.log(event.target);
  //   // setInfoEntered(true);
  //   // onSubmit({
  //   //   ticketId: ticketId.ticketId,
  //   //   name: name,
  //   //   email: email,
  //   //   phoneNumber: phoneNumber,
  //   //   answers: answers,
  //   // });
  // };

  // Stripe payments ------------------------------
  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    return await fetchEventOrMembershipCheckoutSecret(bodyData);
  }, []);

  // can be null to options.clientSecret or options.fetchClientSecret if you are performing an initial server-side render or when generating a static site.
  const options = { fetchClientSecret };

  //------------------------------------------------

  return (
    <div className="max-w-screen from-AUIS-dark-teal to-AUIS-teal min-h-screen bg-gradient-to-b">
      <div className="flex flex-col items-center text-center">
        <h1 className="my-12 text-5xl font-bold text-white">Checkout</h1>
      </div>
      <div className="item flex justify-center">
        <div
          className={`drop-shadow-all mb-12 flex w-[40rem] items-center justify-center rounded-lg bg-white p-5 lg:w-[68rem]`}
        >
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout className="flex flex-grow" />
          </EmbeddedCheckoutProvider>
        </div>
        {/* <div
          className={` w-[40rem] ${isTicket.isTicket && !infoEntered ? "flex" : "hidden"}`}
        >
          <CheckoutInformation
            ticketId={ticketId.ticketId}
            setInfoEntered={setInfoEntered}
          />
        </div> */}
      </div>
    </div>
  );
}

export default CheckoutScreen;
