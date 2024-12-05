import { useQuery } from "@apollo/client";
import {
  GET_EVENTS_GALLERY,
  GET_EVENTS_SLIDER,
} from "../graphql/queries";
import LoadingSpinner from "../components/navigation/LoadingSpinner";
import type { Event, EventGallery } from "../types/types";
import { Mapper } from "../utils/Mapper";
import EventGalleryComponent from "@components/events-page/EventGalleryComponent";
import { useEffect, useState } from "react";
import UpcomingEvents from "@components/events-slider/EventSlider";

export default function EventScreen({ navbar }: { navbar: JSX.Element }) {
  // Get today's date for filtering
  const currentDate = new Date();

  // Queries
  const {
    loading: eventsLoading,
    data: eventsData,
    error: eventsError,
  } = useQuery(GET_EVENTS_SLIDER);

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
        const mappedEvents = Mapper.mapToEventsSlider(eventsData);
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

  // Filtering - can be changed to be direct API call in future
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
                <h3 className="my-5 px-5 text-xl text-white">
                  Our exciting new events lined up just for you.
                </h3>
              </div>
              <div className="flex h-auto w-full flex-row items-center justify-center bg-transparent pb-10">
                <div className="w-11/12 lg:w-3/4">
                  <UpcomingEvents
                    pastEvent={false}
                    events={upcomingEvents}
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
                  events={pastEvents}
                  noEvents={errorEvents || pastEvents.length == 0}
                />
              </div>
            </div>
            {errorGallery ? (
              <div className="py-10 text-center">
                There are no event photos to display
              </div>
            ) : (
              <EventGalleryComponent photos={gallery} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
