import { useQuery } from "@apollo/client";
import { GET_EVENTS, GET_EVENTS_GALLERY } from "../graphql/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import type { Event, EventGallery } from "../types/types";
import { Mapper } from "../utils/Mapper";

export default function EventScreen() {
  const { loading: eventsLoading, data: eventsData, error: eventsError } = useQuery(GET_EVENTS);
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

  const events: Event[] = Mapper.mapToEvents(eventsData);
  const eventsGallery: EventGallery[] = Mapper.mapToEventsGallery(eventGalleryData);

  return (
    <div>
      <h1>Event Screen</h1>
      {events.map((event) => {
        return (
          <h1>{event.title}</h1>
        )
      })}
      {eventsGallery.map((event) => {
        return (
          <h1>{event.id}</h1>
        )
      })}
    </div>
  );
}
