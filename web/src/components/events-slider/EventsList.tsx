import { EventsSlider } from "../../types/types";
import EventCard from "./EventCard";
import { useNavigate } from "react-router-dom";
import "keen-slider/keen-slider.min.css";

interface EventsListProps {
  events: EventsSlider[];
  sliderRef: (node: HTMLElement | null) => void;
  pastEvent: boolean;
}

export default function EventList({
  events,
  sliderRef,
  pastEvent,
}: EventsListProps) {
  const navigate = useNavigate();
  function handleOnClick(id: number) {
    if (id > 0) {
      navigate(`/events/${id}`);
    }
  }
  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        {events.map((event) => (
          <div
            key={event.id}
            className="keen-slider__slide p-2 hover:cursor-pointer"
            onClick={() => handleOnClick(event.id)}
          >
            <EventCard pastEvent={pastEvent} title={event.title} image={event.image} location={event.location} eventDateStart={event.eventDateStart} />
          </div>
        ))}
      </div>
    </>
  );
}
