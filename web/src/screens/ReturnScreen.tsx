import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { EmailLink } from "../data/data";
// import { getSessionStatus } from "../api/apiRequests";
import { useSessionStatus } from "../hooks/api/useSessionStatus";
import LoadingSpinner from "@components/navigation/LoadingSpinner";
import { useSearchParams } from "react-router-dom";
import ErrorReturn from "@components/return-page/ErrorReturn";

export default function ReturnScreen() {  
  
  
  let sessionId: string;
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  if (session_id !== null && session_id.length !== 0) {
    sessionId = session_id;
  } else {
    return <ErrorReturn />;
  }


  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState("");

  const {
    data: sessionStatus,
    status: sessionStatusHookStatus,
  } = useSessionStatus(sessionId);

  // update values once data is fetched
  useEffect(() => {
    if (sessionStatusHookStatus === "success") {
      setStatus(sessionStatus.status);
      setCustomerEmail(sessionStatus.customer_email);
    }
  }, [sessionStatusHookStatus, sessionStatus]);

  if (sessionStatusHookStatus === "pending") {
    return <LoadingSpinner />;
  }

  if (sessionStatusHookStatus === "error" ){
    return <ErrorReturn/>
  }

  if (sessionStatusHookStatus === "success") {
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
    }
  } else {
      <ErrorReturn />
  }
}
