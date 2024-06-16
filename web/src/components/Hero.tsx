import auisHalfLogo from "../assets/peacock_white_side.png";
import auisHalfLogo1 from "../assets/peacock_white_left_side.png";
import auisAbbrev from "../assets/auis_no_depth.png";
import Header from "./Header";

export default function Hero() {
  return (
    <>
      <div className=" min-h-[calc(100vh-70px)] bg-gradient-to-b from-AUIS-dark-teal to-AUIS-teal">
        <Header />
        <div className="flex">
        <div className="hidden md:flex min-w-[150px]">
            <img src={auisHalfLogo1} alt="AUIS logo" className=" w-[150px] h-[300px] lg:w-[250px] lg:h-[500px] transform scaleX(-1) opacity-50" />
          </div>

          <div className="flex-grow">
            <h1 className="text-center font-bold text-white text-2xl drop-shadow-glow mt-10 ">
              University of Auckland's Official Indian Club
            </h1>
            <div className="flex justify-center">
              <img
                src={auisAbbrev}
                alt="AUIS logo"
                className="h-auto max-w-lg rounded-lg w-[300px] lg:w-[500px] drop-shadow-glow"
              />
            </div>
            <h2 className=" text-center font-bold text-white text-2xl mt-2 mb-5 drop-shadow-glow">Not a member?</h2>
            <div className="flex justify-center">
            <button
              type="button"
              className=" px-10 py-3 bg-primary-orange font-bold text-white text-3xl rounded-2xl"
            >
              Join us now!
            </button>
            </div>
          </div>

          <div className="hidden md:flex min-w-[150px]">
            <img src={auisHalfLogo} alt="AUIS logo" className=" w-[150px] h-[300px] lg:w-[250px] lg:h-[500px] opacity-50" />
          </div>
        </div>
      </div>
    </>
  );
}
