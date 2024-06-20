import SimpleSlider from "./SimpleSlider";


function UpcomingEvents() {
  return (
    <>
      <div className="bg-gradient-to-b from-AUIS-dark-teal to-AUIS-teal pb-20">
        <h1 className=" text-white text-5xl text-center font-bold py-12 mx-3">
          Our Upcoming Events!
        </h1>
        <div className="" >
          <SimpleSlider/>
        </div>
      </div>
    </>
  );
}

export default UpcomingEvents;
