import { Event } from "../../types/types";
import UpcomingEventCard from "./UpcomingEventCard";
import { Link } from "react-router-dom";
import "keen-slider/keen-slider.min.css";

interface UpcomingEventsListProps {
  upcomingEvents: Event[];
  sliderRef: (node: HTMLElement | null) => void;
  pastEvent: boolean;
}

const UpcomingEventsList: React.FC<UpcomingEventsListProps> = ({
  upcomingEvents,
  sliderRef,
  pastEvent,
}) => {
  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="keen-slider__slide p-2 hover:cursor-pointer"
          >
            <Link to={`/events/${event.id}`}>
              <UpcomingEventCard pastEvent={pastEvent} upcomingEvent={event} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default UpcomingEventsList;
