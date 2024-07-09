import SimpleSlider from "./SimpleSlider";
import EventCard from "./EventCard";
import { Event } from "../types/types";
import PastEventsList from "./PastEventsList";

interface PastEventsProps {
  pastEvents: Event[];
}

const PastEvents: React.FC<PastEventsProps> = ({ pastEvents }) => {
  return (
    <div className="bg-white pb-20">
      <h1 className="mx-3 py-12 text-center text-5xl font-bold text-black">
        Past Events
      </h1>
     <PastEventsList pastEvents={pastEvents}/>
    </div>
  );
};

export default PastEvents;
