import UpcomingEventsList from "./UpcomingEventsList";
import { Event } from "../types/types";
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";

interface UpcomingEventsProps {
  upcomingEvents: Event[];
  noEvents: boolean;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ upcomingEvents }) => {
  return (
    <div className="from-AUIS-dark-teal to-AUIS-teal bg-gradient-to-b pb-20">
      <h1 className="mx-3 py-10 text-center text-5xl font-bold text-white">
        Our Upcoming Events!
      </h1>
      <div className="mx-auto flex items-center justify-center">
      <LeftArrow
            onClick={(e: any) =>
              console.log("clicked")
              // e.stopPropagation() || instanceRef.current?.next()
            }
            disabled={false
              // currentSlide >=
              // instanceRef.current.track.details.slides.length - (screenSize.width > 640 ? (screenSize.width > 1000 ? 3 : 2) : 1)
            }
          />
        <UpcomingEventsList upcomingEvents={upcomingEvents} />
        <RightArrow
            onClick={(e: any) =>
              console.log("clicked")
              // e.stopPropagation() || instanceRef.current?.next()
            }
            disabled={false
              // currentSlide >=
              // instanceRef.current.track.details.slides.length - (screenSize.width > 640 ? (screenSize.width > 1000 ? 3 : 2) : 1)
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

export default UpcomingEvents;
