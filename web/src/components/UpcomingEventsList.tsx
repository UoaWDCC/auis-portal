import { Event } from "../types/types";
import UpcomingEventCard from "./UpcomingEventCard";
import { Link } from "react-router-dom";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import useScreenSize from "../hooks/useScreenSize";

interface UpcomingEventsListProps {
  upcomingEvents: Event[];
}

const UpcomingEventsList: React.FC<UpcomingEventsListProps> = ({
  upcomingEvents,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const screenSize = useScreenSize();

  const [sliderRef, instanceRef] = useKeenSlider({
    // loop: true,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    mode: "free-snap",
    created() {
      setLoaded(true);
    },
    slides: {
      origin: "auto",
      perView: screenSize.width > 640 ? (screenSize.width > 1000 ? 3 : 2) : 1,
      // spacing: 15,
    },
  });

  return (
    <>
      {/* {loaded && instanceRef.current && (
        <>
          <LeftArrow
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            disabled={currentSlide === 0}
          />
        </>
      )} */}
      <div ref={sliderRef} className="keen-slider">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="keen-slider__slide p-2 hover:cursor-pointer"
          >
            <Link to={`/events/${event.id}`}>
              <UpcomingEventCard upcomingEvent={event} />
            </Link>
          </div>
        ))}
      </div>

      {/* Loaded is needed to make sure all slider slides are loaded in */}
      {/* {loaded && instanceRef.current && (
        <>
          <RightArrow
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            disabled={
              currentSlide >=
              instanceRef.current.track.details.slides.length - (screenSize.width > 640 ? (screenSize.width > 1000 ? 3 : 2) : 1)
            }
          />
        </>
      )} */}
    </>
  );
};

function LeftArrow(props: { disabled: boolean; onClick: (e: any) => void }) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <IoArrowBackCircleOutline
      onClick={props.onClick}
      className={`arrow mx-4 hidden h-16 w-16 text-gray-400 hover:cursor-pointer sm:flex ${disabled ? "opacity-65" : " "}`}
    />
  );
}

function RightArrow(props: { disabled: boolean; onClick: (e: any) => void }) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <IoArrowForwardCircleOutline
      onClick={props.onClick}
      className={`arrow mx-4 hidden h-16 w-16 text-gray-400 hover:cursor-pointer sm:flex ${disabled ? "opacity-65" : " "}`}
    />
  );
}

export default UpcomingEventsList;
