import React from "react";
import { Event } from "../../types/types";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import dayjs from "dayjs";

interface UpcomingEventCardProps {
  upcomingEvent: Event;
  pastEvent: boolean;
}

const UpcomingEventCard: React.FC<UpcomingEventCardProps> = ({
  upcomingEvent,
  pastEvent,
}) => {
  // Calculate the difference in time from now to the event start date
  const eventDate = dayjs(upcomingEvent.eventDateStart);
  const now = dayjs();
  const differenceInDays = eventDate.diff(now, "day");
  const differenceInHours = eventDate.diff(now, "hour");
  const differenceInMinutes = eventDate.diff(now, "minute");

  let timeUntilEvent;
  if (differenceInDays > 0) {
    timeUntilEvent = `${differenceInDays} day${differenceInDays != 1 ? "s" : ""}`;
  } else if (differenceInHours > 0) {
    timeUntilEvent = `${differenceInHours} hour${differenceInHours != 1 ? "s" : ""}`;
  } else {
    timeUntilEvent = `${differenceInMinutes} minute${differenceInMinutes != 1 ? "s" : ""}`;
  }
  return (
    <div className="drop-shadow-all h-full w-full rounded-lg bg-white duration-100 hover:bg-white/80">
      {!pastEvent ? (
        <div className="absolute right-2 top-2 z-10 rounded-full bg-orange-500 px-3 py-1 text-base font-bold text-white shadow-sm">
          in {timeUntilEvent}
        </div>
      ) : (
        <></>
      )}

      <div className="grid h-full text-gray-500">
        <div className="flex items-start justify-start">
          <img
            src={upcomingEvent.image}
            alt={upcomingEvent.title}
            className="w-full rounded-t-lg object-contain"
          />
        </div>
        <div className="flex items-end">
          <div className="flex-grow">
            <h5 className="mt-3 text-center text-2xl font-bold text-black">
              {upcomingEvent.title}
            </h5>

            <div className="text-md my-1 flex items-center justify-center gap-2">
              <FaCalendarAlt />{" "}
              {new Date(upcomingEvent.eventDateStart).toLocaleString("en-NZ", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
            <div className="text-md mb-2 flex items-center justify-center gap-2">
              <FaLocationDot /> {upcomingEvent.location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventCard;