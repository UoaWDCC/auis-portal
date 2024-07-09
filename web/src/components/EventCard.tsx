import React from "react";
import { Event } from "../types/types";

interface EventProps {
  event: Event;
}

const EventCard: React.FC<EventProps> = ({ event }) => {
  return (
    <div className="card h-full w-full rounded-lg bg-white shadow-md">
      <img
        src={event.image}
        alt={event.title}
        className="h-full w-full rounded-t-lg object-cover"
      />
      <div className="card-body">
        <h5 className="card-title text-lg font-bold">{event.title}</h5>
        <p className="card-text text-sm">{new Date(event.eventDateStart).toLocaleTimeString()}</p>
        <p className="card-text text-sm">{event.location}</p>
        <p className="card-text text-sm">
          {event.isLive ? "Paid Event" : "Free Event"}
        </p>
        {event.description && (
          <p className="card-text text-sm">{event.description}</p>
        )}
      </div>
    </div>
  );
};

export default EventCard;
