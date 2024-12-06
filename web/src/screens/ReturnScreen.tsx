import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { EmailLink } from "../data/data";

const ReturnScreen = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");
    fetch(`/api/stripe/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      })
      .catch();
  }, []);

  if (status === "open") {
    return <Navigate to="/checkout/payment" />;
  }

  if (status === "complete") {
    return (
      <div className="from-AUIS-dark-teal to-AUIS-teal min-h-svh bg-gradient-to-b pb-20">
        <div className="flex items-center justify-center pt-36">
          <div>
            <h1 className="mx-3 pb-2 text-center text-5xl font-bold text-white">
              Payment Successful
            </h1>
          </div>
        </div>
        <div>
          <h1 className="pt-12 text-center text-lg text-white">
            Payment successful, a confirmation email will be sent to{" "}
            {customerEmail}.
          </h1>
          <p className="text-center text-lg text-white">
            If you have any questions, please email{" "}
            <a className="text-blue-500" href={`mailto:${EmailLink}`}>
              {EmailLink}
            </a>
            .
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
  } else {
    return (
      <>
        <div className="from-AUIS-dark-teal to-AUIS-teal min-h-svh bg-gradient-to-b pb-20">
          <div className="flex items-center justify-center pt-36">
            <div>
              <h1 className="mx-3 pb-2 text-center text-5xl font-bold text-white">
                Payment Failed
              </h1>
            </div>
          </div>
          <div>
            <p className="pt-12 text-center text-white">
              Please try again, or contact{" "}
              <a className="text-blue-500" href={`mailto:${EmailLink}`}>
                {EmailLink}
              </a>
              .
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
      </>
    );
  }
};

export default ReturnScreen;
