import { useEffect, useRef, useState } from "react";
import { getEventById } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { Mapper } from "@utils/Mapper";
import { Event, EventAndTicket, Ticket } from "../types/types";
import { useParams, useSearchParams } from "react-router-dom";
import InformationHeader from "@components/event-information-page/InformationHeader";
import EventDescription from "@components/event-information-page/EventDescription";
import LineBreak from "@components/event-information-page/LineBreak";
import LocationInformation from "@components/event-information-page/LocationInformation";
import TicketCard from "@components/event-information-page/TicketCard";
import TermsAndConditions from "@components/event-information-page/TermsAndConditions";
import ContactInformation from "@components/event-information-page/ContactInformation";

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
    ticketBypassLink: true,
    bypassTicketLink: "https://google.com",
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
        console.log(event);
      } catch (error) {
        setErrorEvent(true);
        console.log(error);
      }
    }
  }, [eventData, eventError, eventLoading]);
  let ticketPrices = []
  //TODO: add screen for not found event
  for (let i = 0; i < event.ticket.length; i++){
    ticketPrices.push(event.ticket[i].price)
  }
  const priceRange = "$" + Math.min(...ticketPrices).toFixed(2).toString() + " - $" + Math.max(...ticketPrices).toFixed(2).toString()

  const ref = useRef<null | HTMLDivElement>(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  //   const markdown = `A paragraph with *emphasis* and **strong importance**.

  // > A block quote with ~strikethrough~ and a URL: https://reactjs.org.

  // * Lists
  // * [ ] todo
  // * [x] done

  // A table:

  // | a | b |
  // | - | - |
  // `;

  //   const test: string = `

  //   _✨ Our most awaited event of the year… THE AUIS BALL 2024!✨🍾🪩_

  // It’s time to dust off your finest ethnic attire and join us for an unforgettable night of celebrating Indian culture in all its glory 🎉💃🕺

  // Prepare to be wowed with our stunning ballroom, exquisite range of food options, and music and dance performances to bring the wedding vibes we know you all have been missing! 🌟

  // - 🗓️ Saturday 3rd August
  // - ⏰ 6.30pm - 1am
  // - 📍Grand Millennium Hotel

  // This is strictly an 18+ ONLY event.

  // But wait, there’s more! An extra specialty of our Ball this year, ticket holders will get exclusive access to our pre-events leading up to the Ball to truly provide an authentic Indian wedding experience 🤩 More information about these events will be released soon!

  // We are also calling all passionate choreographers to help us light the stage! 🪔 Apply now through the link in our bio. Forms for dancers will be released soon, keep an eye out! The Choreographer Form will close on Saturday 15th June at 11.59pm.

  // Don’t miss out on the opportunity to fulfil your filmy fantasies!

  // Tickets will be released exclusively for AUIS members on Wednesday 12th June at 8pm for the first 100 hours!

  // After 100 hours, the tickets will be available for everyone.

  // The closing date for ticket sales will strictly be on Tuesday 23rd July at 11.59pm (not Indian Standard Time)😋

  // We can’t wait to see you and teri jaans on the dance floor! 🧡🤍💙💚`;

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
            numTicketsLeft={ticket.numTicketsLeft}
            isTicketLive={ticket.isTicketLive}
            bypass={ticket.ticketBypassLink}
            bypassLink={ticket.bypassTicketLink}
            stripeLink={"IDK"}
            title={ticket.name}
            isDouble={ticket.isDouble}
            price={ticket.price}
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
