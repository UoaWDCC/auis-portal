import { useEffect, useRef, useState } from "react";
import { getEventById } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { Mapper } from "@utils/Mapper";
import { EventAndTicket, Ticket } from "../types/types";
import { useParams } from "react-router-dom";
import InformationHeader from "@components/event-information-page/InformationHeader";
import EventDescription from "@components/event-information-page/EventDescription";
import LineBreak from "@components/event-information-page/LineBreak";
import LocationInformation from "@components/event-information-page/LocationInformation";
import TicketCard from "@components/event-information-page/TicketCard";
import TermsAndConditions from "@components/event-information-page/TermsAndConditions";
import ContactInformation from "@components/event-information-page/ContactInformation";
import LoadingSpinner from "@components/LoadingSpinner";
import NoEventFound from "@components/event-information-page/NoEventFound";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

export default function EventInformationScreen({
  navbar,
}: {
  navbar: JSX.Element;
}) {
  const { id } = useParams();

  const tic: Ticket = {
    id: 0,
    name: "string",
    discountCode: "string",
    discountPrice: 0,
    price: 50,
    isMemberOnly: true,
    isDouble: false,
    numTicketsLeft: 50,
    ticketDescription: "descirption",
    startDateTicketSales: "string",
    isTicketLive: false,
    ticketLinkBypass: true,
    bypassTicketLink: "https://google.com",
    stripeLink: "",
  };
  const a: EventAndTicket = {
    id: 0,
    title: "string;",
    description: "string;",
    subtitle: "string;",
    location: "string;",
    locationLink: "string;",
    eventDateStart: "string;",
    eventDateEnd: "string;",
    isLive: true,
    termsAndConditions: "string;",
    eventCapacityRemaining: 0,
    image: "string;",
    ticket: [tic],
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
  } = useQuery(getEventById({ id: queryId }));

  // States
  const [event, setEvent] = useState<EventAndTicket>(a);
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
        const mappedEvent = Mapper.mapToEvent(eventData);
        setEvent(mappedEvent);
        console.log("agdskfjd");
        console.log(event);
      } catch (error) {
        setErrorEvent(true);
        console.log(error);
      }
    }
  }, [eventData, eventError, eventLoading]);
  let ticketPrices = [];
  //TODO: add screen for not found event
  for (let i = 0; i < event.ticket.length; i++) {
    ticketPrices.push(event.ticket[i].price);
  }
  const priceRange =
    "$" +
    Math.min(...ticketPrices)
      .toFixed(2)
      .toString() +
    " - $" +
    Math.max(...ticketPrices)
      .toFixed(2)
      .toString();

  const ref = useRef<null | HTMLDivElement>(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loadingEvent) {
    return <LoadingSpinner />;
  }

  if (errorEvent) {
    return (
      <>
        <div className="from-AUIS-dark-teal to-AUIS-teal min-h-screen bg-gradient-to-b pb-20">
          {navbar}
          <NoEventFound />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="from-AUIS-dark-teal to-AUIS-teal bg-gradient-to-b pb-20">
        {navbar}
        <InformationHeader
          image={event.image}
          title={event.title}
          subtitle={event.subtitle}
          startDate={event.eventDateStart}
          location={event.location}
          scrollToTickets={handleClick}
          priceRange={priceRange}
        />
      </div>
      <div>
        <EventDescription description={event.description} />
      </div>
      <LineBreak />
      <div className="flex justify-center">
        <LocationInformation location={event.location} />
      </div>
      <LineBreak />
      <h2 ref={ref} className="pt-6 text-center text-5xl font-bold">
        Purchase Tickets
      </h2>
      <div>
        {/* TODO: ADD STRIPE ID */}
        {event.ticket.map((ticket) => (
          <TicketCard
          eventId={event.id}
            numTicketsLeft={ticket.numTicketsLeft}
            isTicketLive={
              ticket.isTicketLive && new Date(event.eventDateStart) > new Date()
            }
            bypass={ticket.ticketLinkBypass}
            bypassLink={ticket.bypassTicketLink}
            stripeLink={ticket.stripeLink}
            title={ticket.name}
            isDouble={ticket.isDouble}
            price={ticket.price}
            isMemberOnly={ticket.isMemberOnly}
          />
        ))}
      </div>
      <LineBreak />
      <TermsAndConditions termsAndConditions={event.termsAndConditions} />
      <LineBreak />
      <ContactInformation />
    </>
  );
}
