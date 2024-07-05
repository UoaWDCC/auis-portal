import React from "react";
import { placeholderData } from "../temporary/placeholderType";

interface EventProps {
  event: placeholderData;
}

const EventCard: React.FC<EventProps> = ({ event }) => {
  return (
    <div className="card h-full w-full rounded-lg bg-white p-4 shadow-md">
      <img
        src={event.image}
        alt={event.title}
        className="h-48 w-full rounded-t-lg object-cover"
      />
      <div className="card-body">
        <h5 className="card-title text-lg font-bold">{event.title}</h5>
        <p className="card-text text-sm">{event.date.toDateString()}</p>
        <p className="card-text text-sm">{event.location}</p>
        <p className="card-text text-sm">
          {event.is_paid ? "Paid Event" : "Free Event"}
        </p>
        {event.description && (
          <p className="card-text text-sm">{event.description}</p>
        )}
      </div>
    </div>
  );
};

export default EventCard;
