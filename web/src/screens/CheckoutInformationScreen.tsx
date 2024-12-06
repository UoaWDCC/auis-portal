import CheckoutError from "@components/checkout-page/CheckoutError";
import CheckoutInformation from "@components/forms/CheckoutInformation";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

let bodyData: { priceId: string };
let isTicket: { isTicket: boolean };
let ticketId: { ticketId: number };

// const navigate = useNavigate();

// ensure data required for checkout is here

export default function CheckoutInformationScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  function navigateToPaymentScreen(userTicketId: number) {
    // TODO: is this number or string
    navigate("/checkout/payment", {
      state: {
        data: {
          priceId: bodyData.priceId,
          isTicket: true,
          ticketId: ticketId,
          userTicketId: userTicketId,
        },
      },
    });
  }

  try {
    bodyData = { priceId: location.state.data.priceId };
    isTicket = { isTicket: location.state.data.isTicket };
    ticketId = { ticketId: location.state.data.ticketId };
  } catch {
    return <CheckoutError />;
  }

  return (
    <div className="max-w-screen from-AUIS-dark-teal to-AUIS-teal min-h-screen bg-gradient-to-b">
      <div className="flex flex-col items-center text-center">
        <h1 className="my-12 text-5xl font-bold text-white">Checkout</h1>
      </div>
      <div className="item flex justify-center">
        <div className={`w-[40rem]`}>
          <CheckoutInformation
            ticketId={ticketId.ticketId}
            navigateToPaymentScreen={navigateToPaymentScreen}
          />
        </div>
      </div>
    </div>
  );
}
