import UpcomingEventsList from "./UpcomingEventsList";
import { Event } from "../../types/types";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import useScreenSize from "../../hooks/useScreenSize";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { showNoPastEvents, showNoUpcomingEvents } from "../../data/data";

interface UpcomingEventsProps {
  upcomingEvents: Event[];
  noEvents: boolean;
  pastEvent: boolean;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({
  upcomingEvents,
  noEvents,
  pastEvent,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const screenSize = useScreenSize();

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    mode: "free-snap",
    slides: {
      origin: "auto",
      perView: screenSize.width > 640 ? (screenSize.width > 1000 ? 3 : 2) : 1,
    },
  });

  let sliderLength = upcomingEvents.length;
  if (sliderLength === 0) {
    sliderLength = 3;
  }

  return (
    <div>
      <div className="mx-auto flex items-center justify-center">
        <LeftArrow
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.prev()
          }
          disabled={currentSlide === 0}
        />
        <UpcomingEventsList
          sliderRef={sliderRef}
          upcomingEvents={
            noEvents
              ? pastEvent
                ? showNoPastEvents
                : showNoUpcomingEvents
              : upcomingEvents
          }
          pastEvent={pastEvent}
        />
        <RightArrow
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.next()
          }
          disabled={
            currentSlide >=
            sliderLength -
              (screenSize.width > 640 ? (screenSize.width > 1000 ? 3 : 2) : 1)
          }
        />
      </div>
    </div>
  );
};

function LeftArrow(props: { disabled: boolean; onClick: (e: any) => void }) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <IoArrowBackCircleOutline
      onClick={props.onClick}
      className={`arrow mx-4 hidden h-16 w-16 text-gray-400 hover:cursor-pointer sm:flex ${disabled ? "opacity-40" : "hover:scale-110"}`}
    />
  );
}

function RightArrow(props: { disabled: boolean; onClick: (e: any) => void }) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <IoArrowForwardCircleOutline
      onClick={props.onClick}
      className={`arrow mx-4 hidden h-16 w-16 text-gray-400 hover:cursor-pointer sm:flex ${disabled ? "opacity-40" : "hover:scale-110"}`}
    />
  );
}

export default UpcomingEvents;
