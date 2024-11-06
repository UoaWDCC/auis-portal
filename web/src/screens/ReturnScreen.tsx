import { useState, useEffect } from "react";
import { SiTicktick } from "react-icons/si";
import { Navigate, useNavigate } from "react-router";
import { EmailLink } from "../data/data";
import { RxCrossCircled } from "react-icons/rx";

const ReturnScreen = () => {
  const TEMP_PAYMENT_SUCCESSFUL: boolean = false;

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
      });
  }, []);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return (
    <>
      {!TEMP_PAYMENT_SUCCESSFUL ? (
        <div className="from-AUIS-dark-teal to-AUIS-teal min-h-svh bg-gradient-to-b pb-20">
          <div className="flex items-center justify-center pt-12">
            <RxCrossCircled className="hidden h-12 w-12 text-red-500 md:block" />
            <div>
              <h1 className="mx-3 pb-2 text-center text-5xl font-bold text-white">
                Payment Failed
              </h1>
            </div>
            <RxCrossCircled className="hidden h-12 w-12 text-red-500 md:block" />
          </div>
          <div>
            <p className="pt-12 text-center text-white">
              SOME MSG HERE
              {customerEmail}.
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
      ) : (
        <div className="from-AUIS-dark-teal to-AUIS-teal min-h-svh bg-gradient-to-b pb-20">
          <div className="flex items-center justify-center pt-12">
            <SiTicktick className="hidden h-12 w-12 text-green-500 md:block" />
            <div>
              <h1 className="mx-3 pb-2 text-center text-5xl font-bold text-white">
                Payment Successful
              </h1>
            </div>
            <SiTicktick className="hidden h-12 w-12 text-green-500 md:block" />
          </div>
          <div>
            <p className="pt-12 text-center text-white">
              We appreciate your business! A confirmation email will be sent to{" "}
              {customerEmail}.
            </p>
            <p className="text-center text-white">
              If you have any questions, please email{" "}
              <a href={`mailto:${EmailLink}`}>{EmailLink}</a>.
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
      )}
    </>
  );

  // return null;
};

export default ReturnScreen;
