import React from "react";
import { Event } from "../types/types";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

interface PastEventCardProps {
  pastEvent: Event;
}

const PastEventCard: React.FC<PastEventCardProps> = ({ pastEvent }) => {
  return (
    <div className="card flex h-full w-full flex-col rounded-3xl bg-white shadow-lg md:flex-row">
      <img
        src={pastEvent.image}
        alt={pastEvent.title}
        className="h-fit w-full rounded-t-3xl object-cover md:h-full md:w-64 md:rounded-l-3xl md:rounded-t-none"
      />
      <div className="card-body flex flex-grow flex-col gap-4 p-4 text-gray-500">
        <h5 className="card-title text-lg font-bold text-black">
          {pastEvent.title}
        </h5>
        <p className="h-16 overflow-hidden text-wrap text-justify md:h-10">
          {pastEvent.description}
        </p>
        <div className="text-md">
          <div className="card-text flex flex-row items-center gap-2">
            <FaCalendarAlt />{" "}
            {new Date(pastEvent.eventDateStart).toLocaleString()}
          </div>
          <div className="card-text flex flex-row items-center gap-2">
            <FaLocationDot /> {pastEvent.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastEventCard;
