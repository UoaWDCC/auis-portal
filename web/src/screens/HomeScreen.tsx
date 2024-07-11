import Hero from "@components/Hero";
import Intro from "@components/Intro";
import SomePhotos from "@components/SomePhotos";
import UpcomingEvents from "@components/UpcomingEvents";
import { GET_EVENTS } from "../graphql/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import { useQuery } from "@apollo/client";
import { Mapper } from "@utils/Mapper";

export default function HomeScreen() {
  const {
    loading: eventsLoading,
    data: eventsData,
    error: eventsError,
  } = useQuery(GET_EVENTS);

  if (eventsLoading) {
    return <LoadingSpinner />;
  }

  if (eventsError) {
    return <div>CMS Offline</div>;
  }

  const events = Mapper.mapToEvents(eventsData);

  const currentDate = new Date();

  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.eventDateStart);
    return eventDate >= currentDate;
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
