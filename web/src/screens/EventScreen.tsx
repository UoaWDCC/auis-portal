import { useQuery } from "@apollo/client";
import { GET_EVENTS, GET_EVENTS_GALLERY } from "../graphql/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import type { Event } from "../types/types";
import { Mapper } from "../utils/Mapper";
import Header from "@components/Header";
import PastEvents from "@components/PastEvents";
import UpcomingEventsList from "@components/UpcomingEventsList";
import EventGallery from "@components/EventGallery";

export default function EventScreen() {
  const {
    loading: eventsLoading,
    data: eventsData,
    error: eventsError,
  } = useQuery(GET_EVENTS);
  const {
    loading: eventGalleryLoading,
    data: eventGalleryData,
    error: eventGalleryError,
  } = useQuery(GET_EVENTS_GALLERY);

  if (eventsLoading || eventGalleryLoading) {
    return <LoadingSpinner />;
  }

  if (eventsError || eventGalleryError) {
    return <div>CMS Offline</div>;
  }

  const events = Mapper.mapToEvents(eventsData);
  const eventsGallery = Mapper.mapToEventsGallery(eventGalleryData);

  const currentDate = new Date();

  const { upcomingEvents, pastEvents } = events.reduce<{
    upcomingEvents: Event[];
    pastEvents: Event[];
  }>((acc, event) => {
    const eventDate = new Date(event.eventDateStart);
    if (eventDate >= currentDate) {
      acc.upcomingEvents.push(event);
    } else {
      acc.pastEvents.push(event);
    }
    return acc;
  }, { upcomingEvents: [], pastEvents: [] });


    return (
      <div className="h-auto">
        <div className="max-w-screen h-auto bg-white">
          <div className="max-w-screen from-AUIS-dark-teal to-AUIS-teal h-auto bg-gradient-to-b">
            <Header />
            <div className="flex flex-col items-center text-center text-white">
              <h1 className="text-4xl font-bold md:text-6xl">Our Upcoming Events!</h1>
              <h3 className="my-5 text-sm text-AUIS-light-teal py-2">
                Our exciting new events lined up just for you.
              </h3>
            </div>
            <div className="w-full h-auto flex flex-row items-center justify-center bg-transparent pb-10">
              <div className="w-11/12 lg:w-3/4">
               <UpcomingEventsList upcomingEvents={upcomingEvents} />
              </div>
            </div>
          </div>
          <PastEvents pastEvents={pastEvents} />
          <EventGallery />
        </div>
      </div>
    );
};
    