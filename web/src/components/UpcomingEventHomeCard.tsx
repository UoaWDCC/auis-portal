import { Event } from "../types/types";

interface UpcomingEventCardProps {
  upcomingEvent: Event;
}

export default function UpcomingEventHomeCard({
  upcomingEvent,
}: UpcomingEventCardProps) {
  return (
    <div className="grid h-full w-72 grid-cols-2">
      <div className="m-3 h-80 w-64 flex-col items-center justify-center rounded-lg py-10">
        <img
          className="h-64 w-64 rounded-lg object-cover"
          src={upcomingEvent.image}
          alt="Event Image"
        />
        <h3 className="mx-3 py-4 text-center text-3xl font-bold text-white">
          {upcomingEvent.title}
        </h3>
      </div>
      <div className="flex justify-end py-7">
        <div className="bg-primary-orange flex h-14 w-28 justify-center rounded-[3rem]">
          <div className="py-2.5 text-2xl font-bold text-white">
            {upcomingEvent.eventDateStart}
          </div>
        </div>
      </div>
    </div>
  );
}
