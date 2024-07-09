import SimpleSlider from "./SimpleSlider";

interface UpcomingEventsProps {
  is_events_page?: boolean;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({
  is_events_page = false,
}) => {
  return (
    <div className="from-AUIS-dark-teal to-AUIS-teal bg-gradient-to-b pb-20">
      <h1
        className={`text-center text-5xl font-bold text-white ${
          is_events_page ? "py-5" : "py-10"
        } mx-3`}
      >
        Our Upcoming Events!
      </h1>
      {is_events_page ? (
        <p className="text-AUIS-light-teal text-md mb-4 text-center">
          Our exciting new events lined up just for you.
        </p>
      ) : null}
      <div className="">
        <SimpleSlider>hi</SimpleSlider>
      </div>
    </div>
  );
};

export default UpcomingEvents;
