import Hero from "@components/Hero";
import Intro from "@components/Intro";
import SomePhotos from "@components/SomePhotos";
import UpcomingEvents from "@components/UpcomingEvents";
import { GET_EVENTS, GET_SOME_PHOTOS } from "../graphql/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import { useQuery } from "@apollo/client";
import { Mapper } from "@utils/Mapper";
import { useEffect, useState } from "react";
import type { Event, SomePhoto } from "../types/types";

export default function HomeScreen({ navbar }: { navbar: JSX.Element }) {
  // Queries
  const {
    loading: eventsLoading,
    data: eventsData,
    error: eventsError,
  } = useQuery(GET_EVENTS);

  const {
    loading: photosLoading,
    data: photosData,
    error: photosError,
  } = useQuery(GET_SOME_PHOTOS);

  // States
  const [events, setEvents] = useState<Event[]>([]);
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
        const mappedEvents = Mapper.mapToEvents(eventsData);
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
    <div>
      <Hero navbar={navbar} />
      <Intro />
      {loadingEvents ? (
        <LoadingSpinner />
      ) : (
        <UpcomingEvents
          upcomingEvents={upcomingEvents}
          noEvents={errorEvents}
        />
      )}
      {loadingPhotos ? (
        <LoadingSpinner />
      ) : (
        <SomePhotos photos={photos} noPhotos={errorPhotos} />
      )}
    </div>
  );
}
