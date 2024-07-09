import React from 'react'
import SimpleSlider from './SimpleSlider';
import { Event } from '../types/types';
import UpcomingEventCard from './UpcomingEventCard';

interface UpcomingEventsListProps {
  upcomingEvents: Event[];
}

const UpcomingEventsList: React.FC<UpcomingEventsListProps> = ({
  upcomingEvents,
}) => {
  return (
    <>
      <SimpleSlider>
        {upcomingEvents.map((event, index) => (
          <div key={index} className="p-2">
            <UpcomingEventCard upcomingEvent={event} />
          </div>
        ))}
      </SimpleSlider>
    </>
  );
};

export default UpcomingEventsList;
