import React from 'react'
import { Event } from '../types/types';
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import dayjs from 'dayjs';

interface UpcomingEventCardProps {
    upcomingEvent: Event;
}
  
const UpcomingEventCard: React.FC<UpcomingEventCardProps> = ({ upcomingEvent }) => {
     // Calculate the difference in time from now to the event start date
  const eventDate = dayjs(upcomingEvent.eventDateStart);
  const now = dayjs();
  const differenceInDays = eventDate.diff(now, 'day');
  const differenceInHours = eventDate.diff(now, 'hour');
  const differenceInMinutes = eventDate.diff(now, 'minute');

  let timeUntilEvent;
  if (differenceInDays > 0) {
    timeUntilEvent = `${differenceInDays} day${differenceInDays > 1 ? 's' : ''}`;
  } else if (differenceInHours > 0) {
    timeUntilEvent = `${differenceInHours} hour${differenceInHours > 1 ? 's' : ''}`;
  } else {
    timeUntilEvent = `${differenceInMinutes} minute${differenceInMinutes > 1 ? 's' : ''}`;
  }
    return (
        <div className="card h-full w-full rounded-lg bg-white shadow-md relative">
        <div className='absolute top-2 right-2 bg-orange-500 text-white font-bold text-base px-3 py-1 rounded-full shadow-sm z-10'>
          in {timeUntilEvent}
        </div>
          <img
            src={upcomingEvent.image}
            alt={upcomingEvent.title}
            className="h-full w-full rounded-t-lg object-cover"
          />
          <div className="card-body text-gray-500">
            <h5 className="card-title text-lg font-bold text-black">{upcomingEvent.title}</h5>
            <div className="card-text text-sm flex flex-row gap-2 items-center">
                <FaCalendarAlt /> {new Date(upcomingEvent.eventDateStart).toLocaleString()}</div>
            <div className="card-text text-sm flex flex-row gap-2 items-center">
                <FaLocationDot /> {upcomingEvent.location}</div>
          </div>
        </div>
      );
}

export default UpcomingEventCard;