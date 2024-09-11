import EventSlider from "./EventSlider";
import { Event } from "../types/types";
import UpcomingEventCard from "./UpcomingEventCard";
import { Link } from "react-router-dom";

interface UpcomingEventsListProps {
  upcomingEvents: Event[];
}

const UpcomingEventsList: React.FC<UpcomingEventsListProps> = ({
  upcomingEvents,
}) => {
  return (
    <>
      <EventSlider cardType="upcoming">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="p-2 hover:cursor-pointer">
            <Link to={`/events/${event.id}`}>
              <UpcomingEventCard upcomingEvent={event} />
            </Link>
          </div>
        ))}
      </EventSlider>
    </>
  );
};

export default UpcomingEventsList;
