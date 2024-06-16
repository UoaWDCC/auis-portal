import { BiCalendar } from "react-icons/bi";
import { MdEvent, MdGroups, MdHandshake } from "react-icons/md";
import { TbArcheryArrow, TbTargetArrow } from "react-icons/tb";

export default function Intro() {
  return (
    <>
      <div className="overflow-x-clip bg-white">
        <div className=" -translate-y-36 mt-16 ml-[-150%] md:ml-[-50%] h-[850px] sm:h-[600px] md:h-[600px] lg:h-[450px] xl:h-[400px] 2xl:h-[350px] w-[400%] md:w-[200%] rounded-t-[100%] bg-white">
          <div className="mt-5 text-center text-2xl">
            <h1 className=" pt-10 font-bold text-black text-4xl mb-5">
              Quick intro to us!
            </h1>
            <div className=" md:ml-[25%] ml-[37.5%] w-[25%] md:w-[50%]">
              <div className="grid grid-cols-2 grid-row-6 lg:grid-cols-4 lg:grid-row-3 mx-12 gap-x-10">
                  <div className="w-full flex items-center justify-center row-start-1 row-end-1 col-start-1 col-end-1">
                    <MdGroups size={150} color="black" />
                  </div>
                  <div className="w-full flex items-center justify-center row-start-1 row-end-1 col-start-2 col-end-2">
                    <TbTargetArrow size={100} color="black" />
                  </div>
                  <div className="w-full flex items-center justify-center mt-12 lg:mt-0 lg:row-start-1 lg:row-end-1 lg:col-start-3 lg:col-end-3 row-start-4 row-end-4 col-start-1 col-end-1">
                    <MdEvent size={100} color="black"/>
                  </div>
                  <div className="w-full flex items-center justify-center mt-12 lg:mt-0 lg:row-start-1 lg:row-end-1 lg:col-start-4 lg:col-end-4 row-start-4 row-end-4 col-start-2 col-end-2">
                    <MdHandshake size={100} color="black"/>
                  </div>
                  
                <h2 className=" text-center text-black font-bold text-2xl md:text-3xl pb-5 row-start-2 row-end-2 col-start-1 col-end-1">
                    Who are we?
                  </h2>
                  <h2 className=" text-center text-black font-bold text-2xl md:text-3xl pb-5 row-start-2 row-end-2 col-start-2 col-end-2">
                    Our Mission
                  </h2>
                  <h2 className=" text-center text-black font-bold text-2xl md:text-3xl pb-5 lg:row-start-2 lg:row-end-2 lg:col-start-3 lg:col-end-3">
                    Activities
                  </h2>
                  <h2 className=" text-center text-black font-bold text-2xl md:text-3xl pb-5 lg:row-start-2 lg:row-end-2 lg:col-start-4 lg:col-end-4">
                    Join Us
                  </h2>
                  <p className=" text-center text-black text-lg md:text-2xl row-start-3 row-end-3 col-start-1 col-end-1">
                    Auckland University Indian Society, celebrating and sharing Indian culture.
                  </p>
                  <p className=" text-center text-black text-lg md:text-2xl row-start-3 row-end-3 col-start-2 col-end-2">
                  Connecting students through vibrant Indian cultural events.
                  </p>
                  <p className=" text-center text-black text-lg md:text-2xl lg:row-start-3 lg:row-end-3 lg:col-start-3 lg:col-end-3">
                  Cultural festivals, workshops, social gatherings and more!!
                  </p>
                  <p className=" text-center text-black text-lg md:text-2xl lg:row-start-3 lg:row-end-3 lg:col-start-4 lg:col-end-4">
                  Experience Indian culture, make friends, and have fun! 
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
