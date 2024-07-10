import SimpleSlider from "./SimpleSlider";
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
      <SimpleSlider cardType="upcoming">
        {upcomingEvents.map((event, index) => (
          <div key={index} className="p-2 hover:cursor-pointer">
            <Link to={`/events/${event.id}`}>
              <UpcomingEventCard upcomingEvent={event} />
            </Link>
          </div>
        ))}
      </SimpleSlider>
    </>
  );
};

export default UpcomingEventsList;
