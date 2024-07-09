import UpcomingEventsList from "./UpcomingEventsList";
import { Event } from "../types/types";

interface UpcomingEventsProps {
  upcomingEvents: Event[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({upcomingEvents}) => {
  return (
    <div className="from-AUIS-dark-teal to-AUIS-teal bg-gradient-to-b pb-20">
      <h1 className="text-center text-5xl font-bold text-white py-10 mx-3">
        Our Upcoming Events!
      </h1>
      <UpcomingEventsList upcomingEvents={upcomingEvents} />
    </div>
  );
};

export default UpcomingEvents;

