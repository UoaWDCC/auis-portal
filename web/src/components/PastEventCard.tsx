import React from "react";
import { Event } from "../types/types";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

interface PastEventCardProps {
  pastEvent: Event;
}

const PastEventCard: React.FC<PastEventCardProps> = ({ pastEvent }) => {
  return (
    <div className="card h-full w-full rounded-3xl bg-white shadow-lg flex flex-col md:flex-row">
      <img
        src={pastEvent.image}
        alt={pastEvent.title}
        className="h-fit w-full md:w-64 md:h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-t-none"
      />
      <div className="card-body p-4 flex-grow flex flex-col text-gray-500 gap-4">
        <h5 className="card-title text-lg font-bold text-black">{pastEvent.title}</h5>
        <p className="text-wrap h-16 md:h-10 overflow-hidden text-justify">{pastEvent.description}</p>
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
