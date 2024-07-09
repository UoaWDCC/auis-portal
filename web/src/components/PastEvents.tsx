import SimpleSlider from "./SimpleSlider";
import { placeholderData } from "../temporary/placeholderType";
import EventCard from "./EventCard";

interface PastEventsProps {
  pastEvents: placeholderData[];
}

const PastEvents: React.FC<PastEventsProps> = ({ pastEvents }) => {
  return (
    <div className="bg-white pb-20">
      <h1 className="mx-3 py-12 text-center text-5xl font-bold text-black">
        Past Events
      </h1>
      <SimpleSlider>
        {pastEvents.map((event, index) => (
          <div key={index} className="p-2">
            <EventCard event={event} />
          </div>
        ))}
      </SimpleSlider>
    </div>
  );
};

export default PastEvents;
