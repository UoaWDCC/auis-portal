import { useQuery } from "@apollo/client";
import { Mapper } from "@utils/Mapper";
import { useEffect, useState } from "react";
import { GET_EVENTS_SLIDER } from "../graphql/queries";
import { EventsSlider } from "../types/types";
import LoadingSpinner from "@components/navigation/LoadingSpinner";
import EventCard from "@components/events-slider/EventCard";
import { useNavigate } from "react-router";

function EventAttendanceSelectScreen({ navbar }: { navbar: JSX.Element }) {
  const {
    loading: eventsLoading,
    data: eventsData,
    error: eventsError,
  } = useQuery(GET_EVENTS_SLIDER);

  // States
  const [events, setEvents] = useState<EventsSlider[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [errorEvents, setErrorEvents] = useState(false);

  const navigate = useNavigate()

  // useEffect
  useEffect(() => {
    if (!eventsLoading) {
      setLoadingEvents(false);
    }
    if (eventsError) {
      setErrorEvents(true);
    }
    if (eventsData) {
      try {
        const mappedEvents = Mapper.mapToEventsSlider(eventsData);
        setEvents(mappedEvents);
      } catch (error) {
        setErrorEvents(true);
      }
    }
  }, [eventsData, eventsError, eventsLoading]);

  if (loadingEvents) {
    return <LoadingSpinner />;
  }
  console.log(errorEvents)

  return (
    <div className="from-AUIS-dark-teal to-AUIS-teal min-h-[calc(100vh)] bg-gradient-to-b">
      {navbar}
      <h1 className="py-5 text-center text-2xl text-white">
        Select event for attendance
      </h1>
      <div className="flex items-center justify-center">
        <div className="w-[40rem] px-5">
          {errorEvents ? (
            <>
              <h1 className="py-5 text-center text-lg text-white">
        Sorry, there was an error getting events
      </h1>
            </>
          ) : (
            <>{events.map((event) => {
                return (
                  <div
                    onClick={() => navigate(`/admin/attendance/${event.id}`)}
                    className="py-5"
                    key={event.id}
                  >
                    <EventCard
                      title={event.title}
                      image={event.image}
                      location={event.location}
                      eventDateStart={event.eventDateStart}
                      pastEvent={true}
                    />
                  </div>
                );
              })}</>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventAttendanceSelectScreen;
