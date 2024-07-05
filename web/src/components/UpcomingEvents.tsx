import SimpleSlider from "./SimpleSlider";

interface UpcomingEventsProps {
  is_events_page?: boolean;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({
  is_events_page = false,
}) => {
  return (
    <div className="bg-gradient-to-b from-AUIS-dark-teal to-AUIS-teal pb-20">
      <h1
        className={`text-white text-5xl text-center font-bold ${
          is_events_page ? "py-5" : "py-10"
        } mx-3`}
      >
        Our Upcoming Events!
      </h1>
      {is_events_page ? (
        <p className="text-AUIS-light-teal text-center text-md mb-4">
          Our exciting new events lined up just for you.
        </p>
      ) : null}
      <div className="">
        <SimpleSlider>
          hi 
        </SimpleSlider>
      </div>
    </div>
  );
};

export default UpcomingEvents;
