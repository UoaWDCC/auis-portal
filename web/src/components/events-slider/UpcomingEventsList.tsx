import { Event } from "../../types/types";
import UpcomingEventCard from "./UpcomingEventCard";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  function handleOnClick(id: number) {
    if (id > 0) {
      navigate(`/events/${id}`);
    }
  }

  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="keen-slider__slide p-2 hover:cursor-pointer"
            onClick={() => handleOnClick(event.id)}
          >
            <UpcomingEventCard pastEvent={pastEvent} upcomingEvent={event} />
          </div>
        ))}
      </div>
    </>
  );
};

export default UpcomingEventsList;
