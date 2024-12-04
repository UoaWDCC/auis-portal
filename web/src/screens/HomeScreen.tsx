import Hero from "@components/home-page/Hero";
import Intro from "@components/home-page/Intro";
import SomePhotos from "@components/home-page/SomePhotos";
import UpcomingEvents from "@components/events-slider/EventSlider";
import { GET_EVENTS_SLIDER, GET_SOME_PHOTOS } from "../graphql/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import { useQuery } from "@apollo/client";
import { Mapper } from "@utils/Mapper";
import { useEffect, useState } from "react";
import type { EventsSlider, SomePhoto } from "../types/types";

export default function HomeScreen({ navbar }: { navbar: JSX.Element }) {
  // Queries
  const {
    loading: eventsLoading,
    data: eventsData,
    error: eventsError,
  } = useQuery(GET_EVENTS_SLIDER);

  const {
    loading: photosLoading,
    data: photosData,
    error: photosError,
  } = useQuery(GET_SOME_PHOTOS);

  // States
  const [events, setEvents] = useState<EventsSlider[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [errorEvents, setErrorEvents] = useState(false);

  const [photos, setPhotos] = useState<SomePhoto[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [errorPhotos, setErrorPhotos] = useState(false);

  // useEffect
  useEffect(() => {
    if (!eventsLoading) {
      setLoadingEvents(false);
    }
    if (photosError) {
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
    if (!photosLoading) {
      setLoadingPhotos(false);
    }

    if (photosError) {
      setErrorPhotos(true);
    }

    if (photosData) {
      try {
        const mappedPhotos = Mapper.mapToSomePhotos(photosData);
        setPhotos(mappedPhotos);
      } catch (error) {
        setErrorPhotos(true);
      }
    }
  }, [photosData, photosError, photosLoading]);

  // Filtering
  const currentDate = new Date();
  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.eventDateStart);
    return eventDate >= currentDate && event.isLive;
  });

  return (
    <>
      {loadingEvents || loadingPhotos ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Hero navbar={navbar} />
          <Intro />
          <div className="from-AUIS-dark-teal to-AUIS-teal bg-gradient-to-b pb-20">
            <h1 className="mx-3 py-10 text-center text-5xl font-bold text-white">
              Our Upcoming Events!
            </h1>
            <UpcomingEvents
              events={upcomingEvents}
              noEvents={errorEvents || upcomingEvents.length === 0}
              pastEvent={false}
            />
          </div>
          <SomePhotos photos={photos} noPhotos={errorPhotos} />
        </div>
      )}
    </>
  );
}
