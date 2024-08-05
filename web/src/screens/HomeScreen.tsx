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
    loading: execsLoading,
    data: execsData,
    error: execsError,
  } = useQuery(GET_EVENTS);


  const [executives, setExecutives] = useState<Event[]>([]);
  const [noExecs, setNoExecs] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (execsData) {
      try {
        const execs = Mapper.mapToExec(execsData);
        setExecutives(execs);
      } catch (error) {
        setNoExecs(true);
      }
    }
  }, [execsData]);

  if (execsError || execsLoading) {
    return <div>CMS Offline</div>;
  }

  const events = Mapper.mapToEvents(execsData);

  const currentDate = new Date();

  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.eventDateStart);
    const isEventLive = event.isLive;
    return eventDate >= currentDate && isEventLive;
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
