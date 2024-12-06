import CheckoutError from "@components/checkout-page/CheckoutError";
import CheckoutInformation from "@components/forms/CheckoutInformation";
import { useLocation, useNavigate } from "react-router";

let priceId: string;
let ticketId: number;

export default function CheckoutInformationScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  function navigateToPaymentScreen(userTicketId: number) {
    navigate("/checkout/payment", {
      state: {
        data: {
          priceId: priceId,
          userTicketId: userTicketId,
        },
      },
    });
  }

  try {
    priceId = location.state.data.priceId ;
    ticketId = location.state.data.ticketId ;
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
            ticketId={ticketId}
            navigateToPaymentScreen={navigateToPaymentScreen}
          />
        </div>
      </div>
    </div>
  );
}
