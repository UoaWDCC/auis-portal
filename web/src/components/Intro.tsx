import { MdEvent, MdGroups, MdHandshake } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";

export default function Intro() {
  return (
    <>
      <div className="overflow-x-clip bg-white">
        <div className="ml-[-150%] mt-16 h-[850px] w-[400%] -translate-y-36 rounded-t-[100%] bg-white sm:h-[600px] md:ml-[-50%] md:h-[600px] md:w-[200%] lg:h-[450px] xl:h-[400px] 2xl:h-[350px]">
          <div className="mt-5 text-center text-2xl">
            <h1 className="mb-5 pt-10 text-4xl font-bold text-black">
              Quick intro to us!
            </h1>
            <div className="ml-[37.5%] w-[25%] md:ml-[25%] md:w-[50%]">
              <div className="grid-row-6 lg:grid-row-3 mx-12 grid grid-cols-2 gap-x-10 lg:grid-cols-4">
                <div className="col-start-1 col-end-1 row-start-1 row-end-1 flex w-full items-center justify-center">
                  <MdGroups size={150} color="black" />
                </div>
                <div className="col-start-2 col-end-2 row-start-1 row-end-1 flex w-full items-center justify-center">
                  <TbTargetArrow size={100} color="black" />
                </div>
                <div className="col-start-1 col-end-1 row-start-4 row-end-4 mt-12 flex w-full items-center justify-center lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-1 lg:mt-0">
                  <MdEvent size={100} color="black" />
                </div>
                <div className="col-start-2 col-end-2 row-start-4 row-end-4 mt-12 flex w-full items-center justify-center lg:col-start-4 lg:col-end-4 lg:row-start-1 lg:row-end-1 lg:mt-0">
                  <MdHandshake size={100} color="black" />
                </div>

                <h2 className="col-start-1 col-end-1 row-start-2 row-end-2 pb-5 text-center text-2xl font-bold text-black md:text-3xl">
                  Who are we?
                </h2>
                <h2 className="col-start-2 col-end-2 row-start-2 row-end-2 pb-5 text-center text-2xl font-bold text-black md:text-3xl">
                  Our Mission
                </h2>
                <h2 className="pb-5 text-center text-2xl font-bold text-black md:text-3xl lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-2">
                  Activities
                </h2>
                <h2 className="pb-5 text-center text-2xl font-bold text-black md:text-3xl lg:col-start-4 lg:col-end-4 lg:row-start-2 lg:row-end-2">
                  Join Us
                </h2>
                <p className="col-start-1 col-end-1 row-start-3 row-end-3 text-center text-lg text-black md:text-2xl">
                  Auckland University Indian Society, celebrating and sharing
                  Indian culture.
                </p>
                <p className="col-start-2 col-end-2 row-start-3 row-end-3 text-center text-lg text-black md:text-2xl">
                  Connecting students through vibrant Indian cultural events.
                </p>
                <p className="text-center text-lg text-black md:text-2xl lg:col-start-3 lg:col-end-3 lg:row-start-3 lg:row-end-3">
                  Cultural festivals, workshops, social gatherings and more!!
                </p>
                <p className="text-center text-lg text-black md:text-2xl lg:col-start-4 lg:col-end-4 lg:row-start-3 lg:row-end-3">
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
