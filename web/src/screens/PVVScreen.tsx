import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../graphql/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import type { Event } from "../types/types";
import { Mapper } from "../utils/Mapper";

function PVVScreen() {
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

  const events: Event[] = Mapper.mapToEvents(eventsData);

  return (
    <div>
      <h2>PPV Screen</h2>
    </div>
  );
}

export default PVVScreen;
