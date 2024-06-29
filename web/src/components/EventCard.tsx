import React from "react";
import { placeholderData } from "../temporary/placeholderType";

interface EventProps {
  event: placeholderData;
}

const EventCard: React.FC<EventProps> = ({ event }) => {
  return (
    <div className="card p-4 bg-white shadow-md rounded-lg w-full h-full">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover rounded-t-lg"
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
