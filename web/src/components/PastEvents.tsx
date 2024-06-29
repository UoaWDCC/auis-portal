import SimpleSlider from "./SimpleSlider";
import { placeholderData } from "../temporary/placeholderType";
import EventCard from "./EventCard";

interface PastEventsProps {
  pastEvents: placeholderData[];
}

const PastEvents: React.FC<PastEventsProps> = ({ pastEvents }) => {
  return (
    <div className="bg-white pb-20">
      <h1 className="text-black text-5xl text-center font-bold py-12 mx-3">
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
