import { useEffect, useRef, useState } from "react";
import { getEventById } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { Mapper } from "@utils/Mapper";
import { EventAndTickets } from "../types/types";
import { useParams } from "react-router-dom";
import InformationHeader from "@components/event-information-page/InformationHeader";
import EventDescription from "@components/event-information-page/EventDescription";
import LineBreak from "@components/event-information-page/LineBreak";
import LocationInformation from "@components/event-information-page/LocationInformation";
import TicketCard from "@components/event-information-page/TicketCard";
import TermsAndConditions from "@components/event-information-page/TermsAndConditions";
import ContactInformation from "@components/event-information-page/ContactInformation";
import LoadingSpinner from "@components/navigation/LoadingSpinner";
import NoEventFound from "@components/event-information-page/NoEventFound";

export default function EventInformationScreen({
  navbar,
}: {
  navbar: JSX.Element;
}) {
  // event id handling
  let queryId = -1;
  const { id } = useParams();
  if (id !== undefined) {
    queryId = parseInt(id);
  }

  // Queries
  const {
    loading: eventLoading,
    data: eventData,
    error: eventError,
  } = useQuery(getEventById({ id: queryId }));

  // States
  const [event, setEvent] = useState<EventAndTickets>();
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
    }
    if (eventData) {
      try {
        const mappedEvent = Mapper.mapToEvent(eventData);
        setEvent(mappedEvent);
      } catch (error) {
        setErrorEvent(true);
      }
    }
  }, [eventData, eventError, eventLoading]);

  // Ticket price range
  let ticketPrices = [];
  if (event) {
    for (let i = 0; i < event.tickets.length; i++) {
      ticketPrices.push(event.tickets[i].price);
    }
  }

  let priceRange : string = ""
  
  if (ticketPrices.length == 0){
    priceRange = "Free"
  } else if (ticketPrices.length == 1){priceRange="$" +
   ticketPrices[0]
      .toFixed(2)
      .toString()} else{
    "$" +
    Math.min(...ticketPrices)
      .toFixed(2)
      .toString() +
    " - $" +
    Math.max(...ticketPrices)
      .toFixed(2)
      .toString();
}
  // Autoscroll to top of page on landing
  const ref = useRef<null | HTMLDivElement>(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loadingEvent) {
    return <LoadingSpinner />;
  }

  if (errorEvent || !event) {
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
          endDate={event.eventDateEnd}
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
        {event.tickets.length == 0? (<p className=" px-5 pt-3 text-center text-xl md:px-3">No tickets available or needed</p>) : (<></>)}
        {event.tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticketId={ticket.id}
            numTicketsLeft={ticket.numTicketsLeft}
            isTicketLive={
              ticket.isTicketLive &&
              new Date(ticket.startDateTicketSales) <= new Date() &&
              new Date(event.eventDateStart) > new Date() &&
              event.eventCapacityRemaining > 0
            }
            bypass={ticket.ticketLinkBypass}
            bypassLink={ticket.bypassTicketLink}
            stripeLink={ticket.stripeLink}
            title={ticket.name}
            isDouble={ticket.isDouble}
            price={ticket.price}
            description={ticket.ticketDescription}
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
