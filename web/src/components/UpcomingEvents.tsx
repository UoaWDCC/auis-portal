import SimpleSlider from "./SimpleSlider";

function UpcomingEvents() {
  return (
    <>
      <div className="from-AUIS-dark-teal to-AUIS-teal bg-gradient-to-b pb-20">
        <h1 className="mx-3 py-12 text-center text-5xl font-bold text-white">
          Our Upcoming Events!
        </h1>
        <div className="">
          <SimpleSlider />
        </div>
      </div>
    </>
  );
}

export default UpcomingEvents;
