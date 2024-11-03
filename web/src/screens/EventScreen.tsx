import { useQuery } from "@apollo/client";
import { GET_EVENTS, GET_EVENTS_GALLERY } from "../graphql/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import type { Event } from "../types/types";
import { Mapper } from "../utils/Mapper";
import Header from "@components/Header";
import PastEvents from "@components/PastEvents";
// import UpcomingEventsList from "@components/UpcomingEventsList";
import EventGalleryComponent from "@components/EventGalleryComponent";

export default function EventScreen({ navbar }: { navbar: JSX.Element }) {
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

  const { /*upcomingEvents,*/ pastEvents } = events.reduce<{
    upcomingEvents: Event[];
    pastEvents: Event[];
  }>(
    (acc, event) => {
      const eventDate = new Date(event.eventDateStart);
      const isEventLive = event.isLive;
      if (eventDate >= currentDate && isEventLive) {
        acc.upcomingEvents.push(event);
      } else {
        acc.pastEvents.push(event);
      }
      return acc;
    },
    { upcomingEvents: [], pastEvents: [] }
  );

  return (
    <div className="h-auto">
      <div className="max-w-screen h-auto bg-white">
        <div className="max-w-screen from-AUIS-dark-teal to-AUIS-teal h-auto bg-gradient-to-b">
          {navbar}
          <div className="flex flex-col items-center text-center text-white">
            <h1 className="text-4xl font-bold md:text-6xl">
              Our Upcoming Events!
            </h1>
            <h3 className="text-AUIS-light-teal my-5 py-2 text-sm">
              Our exciting new events lined up just for you.
            </h3>
          </div>
          <div className="flex h-auto w-full flex-row items-center justify-center bg-transparent pb-10">
            <div className="w-11/12 lg:w-3/4">
              {/* <UpcomingEventsList sliderRef={null} upcomingEvents={upcomingEvents} /> */}
            </div>
          </div>
          <div className="flex h-auto w-full flex-row items-center justify-center bg-white">
            <div className="w-11/12 lg:w-3/4">
              <PastEvents pastEvents={pastEvents} />
            </div>
          </div>
          <div className="">
            <EventGalleryComponent photos={eventsGallery} />
          </div>
        </div>
      </div>
    </div>
  );
}
