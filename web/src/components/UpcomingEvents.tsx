import UpcomingEventsList from "./UpcomingEventsList";
import { Event } from "../types/types";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import useScreenSize from "../hooks/useScreenSize";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import peacockLogo from "../assets/peacock.png";

interface UpcomingEventsProps {
  upcomingEvents: Event[];
  noEvents: boolean;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({
  upcomingEvents,
  noEvents,
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

  // Handle case with no events
  const today = new Date();
  const showNoEvent: Event = {
    id: -1,
    title: "No Upcoming Events Right Now",
    description: "description",
    subtitle: "subtitle",
    eventDateStart: today.toISOString(),
    eventDateEnd: "termsAndConditions",
    isLive: true,
    termsAndConditions: "termsAndConditions",
    eventCapacityRemaining: 0,
    location: "University of Auckland",
    locationLink: "locationLink",
    image: peacockLogo,
  };
  const showNoEvents: Event[] = [showNoEvent, showNoEvent, showNoEvent];
  let sliderLength = upcomingEvents.length;
  if (sliderLength === 0) {
    sliderLength = 3;
  }

  return (
    <div className="from-AUIS-dark-teal to-AUIS-teal bg-gradient-to-b pb-20">
      <h1 className="mx-3 py-10 text-center text-5xl font-bold text-white">
        Our Upcoming Events!
      </h1>
      <div className="mx-auto flex items-center justify-center">
        <LeftArrow
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.prev()
          }
          disabled={currentSlide === 0}
        />
        <UpcomingEventsList
          sliderRef={sliderRef}
          upcomingEvents={noEvents ? showNoEvents : upcomingEvents}
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
