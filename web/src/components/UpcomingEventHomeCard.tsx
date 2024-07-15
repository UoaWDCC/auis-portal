import { Event } from "../types/types";


interface UpcomingEventCardProps {
  upcomingEvent: Event;
}

export default function UpcomingEventHomeCard({ upcomingEvent }: UpcomingEventCardProps){
    return (
        <div className="grid h-full w-72 grid-cols-2">
                  <div className=" h-80 w-64 rounded-lg m-3 flex-col justify-center items-center py-10">
                    <img className="h-64 w-64 object-cover rounded-lg"  src={upcomingEvent.image} alt="Event Image"/>
                    <h3 className="text-white text-3xl text-center font-bold py-4 mx-3">{upcomingEvent.title}</h3>
                  </div>
                  <div className="flex justify-end py-7">
                    <div className="w-28 h-14 bg-primary-orange flex justify-center rounded-[3rem]">
                      <div className="text-white text-2xl font-bold py-2.5">{upcomingEvent.eventDateStart}</div>
                    </div>
                  </div>
                </div>
      );
}