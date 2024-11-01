import UpcomingEventsList from "./UpcomingEventsList";
import { Event } from "../types/types";

interface UpcomingEventsProps {
  upcomingEvents: Event[];
  noEvents: boolean
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ upcomingEvents }) => {
  return (
    <div className="from-AUIS-dark-teal to-AUIS-teal bg-gradient-to-b pb-20">
      <h1 className="mx-3 py-10 text-center text-5xl font-bold text-white">
        Our Upcoming Events!
      </h1>
      <div className="mx-auto flex w-11/12 items-center justify-center lg:w-3/4">
        <UpcomingEventsList upcomingEvents={upcomingEvents} />
      </div>
    </div>
  );
};

export default UpcomingEvents;
