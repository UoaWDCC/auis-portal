import Hero from "@components/Hero";
import Intro from "@components/Intro";
import SomePhotos from "@components/SomePhotos";
import UpcomingEvents from "@components/UpcomingEvents";
import { GET_EVENTS, GET_EXECS } from "../graphql/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import { useQuery } from "@apollo/client";
import { Mapper } from "@utils/Mapper";
import { useEffect, useState } from "react";
import type { Event, Exec } from "../types/types";

export default function HomeScreen() {
  const {
    loading: eventsLoading,
    data: eventsData,
    error: eventsError,
  } = useQuery(GET_EVENTS);

  const {
    loading: execsLoading,
    data: execsData,
    error: execsError,
  } = useQuery(GET_EXECS);

  const [events, setEvents] = useState<Event[]>([]);
  const [executives, setExecutives] = useState<Exec[]>([]);
  const [noEvents, setNoEvents] = useState(false);
  const [noExecs, setNoExecs] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (eventsData) {
      try {
        const mappedEvents = Mapper.mapToEvents(eventsData);
        setEvents(mappedEvents);
      } catch (error) {
        setNoEvents(true);
      }
    }
  }, [eventsData]);

  useEffect(() => {
    if (execsData) {
      try {
        const mappedExecs = Mapper.mapToExec(execsData);
        setExecutives(mappedExecs);
      } catch (error) {
        setNoExecs(true);
      }
    }
  }, [execsData]);

  useEffect(() => {
    if (!eventsLoading && !execsLoading) {
      setLoading(false);
    }
  }, [eventsLoading, execsLoading]);

  if (eventsError || execsError) {
    return <div>CMS Offline</div>;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  const currentDate = new Date();
  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.eventDateStart);
    return eventDate >= currentDate && event.isLive;
  });

  return (
    <div>
      <Hero />
      <Intro />
      <UpcomingEvents upcomingEvents={upcomingEvents} />
      <SomePhotos />
    </div>
  );
}
