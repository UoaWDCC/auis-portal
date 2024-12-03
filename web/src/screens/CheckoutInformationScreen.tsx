// import auisLogo from "../assets/peacock_white_inner_big.png";
// import auisAbbrev from "../assets/auis_no_depth.png";
// import PurchaseMembershipCard from "@components/membership-page/PurchaseMembershipCard";
// import { GET_PURCHASEABLE_MEMBERSHIPS } from "../graphql/queries";
// import { useQuery } from "@apollo/client";
// import { useEffect, useState } from "react";
// import { PurchasableMembership } from "../types/types";
// import { Mapper } from "@utils/Mapper";
// import LoadingSpinner from "@components/LoadingSpinner";
import CheckoutInformation from "@components/forms/CheckoutInformation";
import { useParams } from "react-router";
import { Question, TicketAndQuestion } from "../types/types";
import { useQuery } from "@apollo/client";
import { getTicketQuestions } from "../graphql/queries";
import { useEffect, useState } from "react";
import { Mapper } from "@utils/Mapper";
import LoadingSpinner from "@components/LoadingSpinner";

export default function CheckoutInformationScreen({
  eventId,
  handleSubmita,
}: {
  eventId : number,
  handleSubmita: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const { id } = useParams();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleSubmita(event);
  };

  const tic: Question = {
    id: 0,
    question: "temp",
    checkForMemberEmail: false,
  };
  const a: TicketAndQuestion = {
    id: 0,
    name: "string;",
    question: [tic],
  };

  let queryId = -1;
  const q = id;
  if (q !== undefined) {
    queryId = parseInt(q);
  }
  console.log(id);
  // Queries
  const {
    loading: eventLoading,
    data: eventData,
    error: eventError,
  } = useQuery(getTicketQuestions({ id: queryId }));

  // States
  const [event, setEvent] = useState<TicketAndQuestion>(a);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [errorEvent, setErrorEvent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect
  useEffect(() => {
    if (!eventLoading) {
      setLoadingEvent(false);
    }
    if (eventError) {
      setErrorEvent(true);
      console.log("ERROR");
    }
    if (eventData) {
      try {
        const mappedEvent = Mapper.mapToTicketQuestion(eventData);
        setEvent(mappedEvent);
        console.log(event);
      } catch (error) {
        setErrorEvent(true);
        console.log(error);
      }
    }
  }, [eventData, eventError, eventLoading]);
  if (loadingEvent) {
    return <LoadingSpinner />;
  }

  if (errorEvent) {
    return (
      <>
        <div className="from-AUIS-dark-teal to-AUIS-teal min-h-screen bg-gradient-to-b pb-20">
          IDK
        </div>
      </>
    );
  }

  return (
    <>
      <div className="from-AUIS-dark-teal to-AUIS-teal min-h-svh bg-gradient-to-b pb-20">
        <h1 className="mx-3 pb-2 text-center text-5xl font-bold text-white">
          Checkout Questions
        </h1>
        <CheckoutInformation
        eventId={eventId}
          handleSubmit={(e) => handleSubmit(e)}
          questions={event.question}
        />
      </div>
    </>
  );
}
