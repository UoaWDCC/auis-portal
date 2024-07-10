import SimpleSlider from "./SimpleSlider";
import EventCard from "./EventCard";
import { Event } from "../types/types";
import { Link } from "react-router-dom";

interface PastEventsListProps {
  pastEvents: Event[];
}

const PastEventsList: React.FC<PastEventsListProps> = ({ pastEvents }) => {
  return (
    <SimpleSlider>
      {pastEvents.map((event, index) => (
        <div key={index} className="p-2 hover:cursor-pointer">
        <Link to={`/events/${event.id}`}>
          <EventCard event={event} />
        </Link>
        </div>
      ))}
    </SimpleSlider>
  );
};

export default PastEventsList;
