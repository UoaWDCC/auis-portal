import { useQuery } from "@apollo/client";
import { GET_EVENTS, GET_EVENTS_GALLERY } from "../graphql/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import type { Event, EventGallery } from "../types/types";
import { Mapper } from "../utils/Mapper";
import PastEvents from "@components/PastEvents";
import UpcomingEventsList from "@components/UpcomingEventsList";
import EventGalleryComponent from "@components/EventGalleryComponent";
import { useEffect, useState } from "react";
import UpcomingEvents from "@components/UpcomingEvents";

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

  // States
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [errorEvents, setErrorEvents] = useState(false);

  const [gallery, setGallery] = useState<EventGallery[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [errorGallery, setErrorGallery] = useState(false);

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
        const mappedEvents = Mapper.mapToEvents(eventsData);
        setEvents(mappedEvents);
      } catch (error) {
        setErrorEvents(true);
      }
    }
  }, [eventsData, eventsError, eventsLoading]);

  useEffect(() => {
    if (!eventGalleryLoading) {
      setLoadingGallery(false);
    }
    if (eventGalleryError) {
      setErrorGallery(true);
    }
    if (eventGalleryData) {
      try {
        const mappedEventGallery = Mapper.mapToEventsGallery(eventGalleryData);
        setGallery(mappedEventGallery);
      } catch (error) {
        setErrorGallery(true);
      }
    }
  }, [eventGalleryData, eventGalleryError, eventGalleryLoading]);

  const currentDate = new Date();

  const { upcomingEvents, pastEvents } = events.reduce<{
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

  const pastEventss: Event[] = [];

  return (
    <>
      {loadingEvents || loadingGallery ? (
        <LoadingSpinner />
      ) : (
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
                  <UpcomingEvents
                    pastEvent={false}
                    upcomingEvents={upcomingEvents}
                    noEvents={errorEvents || upcomingEvents.length == 0}
                  />
                </div>
              </div>
            </div>
            <div className="bg-white pb-20">
              <h1 className="mx-3 pt-12 text-center text-5xl font-bold text-black">
                Past Events
              </h1>
            </div>
            <div className="flex h-auto w-full flex-row items-center justify-center bg-transparent pb-10">
              <div className="w-11/12 lg:w-3/4">
                <UpcomingEvents
                  pastEvent={true}
                  upcomingEvents={pastEvents}
                  noEvents={errorEvents || pastEvents.length == 0}
                />
              </div>
            </div>
            <EventGalleryComponent photos={gallery} />
          </div>
        </div>
      )}
    </>
  );
}
