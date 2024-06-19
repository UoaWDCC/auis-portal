import SimpleSlider from "./SimpleSlider";


function UpcomingEvents() {
  return (
    <>
      <div className=" min-h-[calc(100vh-70px)] bg-gradient-to-b from-AUIS-dark-teal to-AUIS-teal">
        <h1 className=" text-white text-5xl text-center font-bold py-12">
          Our Upcoming Events!
        </h1>
        <div className="m-16" >
          <SimpleSlider/>
        </div>
      </div>
    </>
  );
}

export default UpcomingEvents;
