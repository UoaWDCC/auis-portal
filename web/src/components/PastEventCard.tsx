import React from "react";
import { Event } from "../types/types";

interface PastEventCardProps {
  pastEvent: Event;
}
const PastEventCard: React.FC<PastEventCardProps> = ({ pastEvent }) => {
  return (
    <div className="card flex h-full w-full flex-col rounded-lg bg-white shadow-md md:flex-row">
      <img
        src={pastEvent.image}
        alt={pastEvent.title}
        className="h-fit w-fit object-cover md:h-full"
      />
      <div className="card-body flex flex-grow flex-col p-4">
        <h5 className="card-title text-lg font-bold">{pastEvent.title}</h5>
        <p className="card-text text-sm">
          {new Date(pastEvent.eventDateStart).toLocaleTimeString()}
        </p>
        <p className="card-text text-sm">{pastEvent.location}</p>
        <p className="card-text text-sm">
          {pastEvent.isLive ? "Paid Event" : "Free Event"}
        </p>
        {pastEvent.description && (
          <p className="card-text text-sm">{pastEvent.description}</p>
        )}
      </div>
    </div>
  );
};

export default PastEventCard;
