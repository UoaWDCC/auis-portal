import SimpleSlider from "./SimpleSlider";
import EventCard from "./EventCard";
import { Event } from "../types/types";

interface PastEventsListProps {
  pastEvents: Event[];
}

const PastEventsList: React.FC<PastEventsListProps> = ({ pastEvents }) => {
  return (
    <SimpleSlider>
      {pastEvents.map((event, index) => (
        <div key={index} className="p-2">
          <EventCard event={event} />
        </div>
      ))}
    </SimpleSlider>
  );
};

export default PastEventsList;
