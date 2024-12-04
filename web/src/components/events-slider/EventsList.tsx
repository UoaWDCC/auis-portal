import { Event } from "../../types/types";
import EventCard from "./EventCard";
import { useNavigate } from "react-router-dom";
import "keen-slider/keen-slider.min.css";

interface UpcomingEventsListProps {
  upcomingEvents: Event[];
  sliderRef: (node: HTMLElement | null) => void;
  pastEvent: boolean;
}

export default function EventList({
  upcomingEvents,
  sliderRef,
  pastEvent,
}: UpcomingEventsListProps) {
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
            <EventCard pastEvent={pastEvent} upcomingEvent={event} />
          </div>
        ))}
      </div>
    </>
  );
}
