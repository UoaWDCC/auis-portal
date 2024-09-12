import { Event } from "../types/types";

interface UpcomingEventCardProps {
  upcomingEvent: Event;
}

export default function UpcomingEventHomeCard({
  upcomingEvent,
}: UpcomingEventCardProps) {
  const formattedDate = new Date(
    upcomingEvent.eventDateStart
  ).toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "long",
  });

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
        <div className="bg-primary-orange flex h-10 items-center justify-center whitespace-nowrap rounded-[1.5rem]">
          <div className="px-3 py-2 text-xl font-bold text-white">
            {formattedDate}
          </div>
        </div>
      </div>
    </div>
  );
}
