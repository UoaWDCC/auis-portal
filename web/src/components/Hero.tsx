import auisHalfLogo from "../assets/peacock_white_side.png"
import auisHalfLogo1 from "../assets/peacock_white_left_side.png"
import auisAbbrev from "../assets/auis_no_depth.png"
import Header from "./Header"

export default function Hero() {
  return (
    <>
      <div className="from-AUIS-dark-teal to-AUIS-teal min-h-[calc(100vh-70px)] bg-gradient-to-b">
        <Header />
        <div className="flex">
          <div className="hidden min-w-[150px] md:flex">
            <img
              src={auisHalfLogo1}
              alt="AUIS logo"
              className="scaleX(-1) h-[300px] w-[150px] transform opacity-50 lg:h-[500px] lg:w-[250px]"
            />
          </div>

          <div className="flex-grow">
            <h1 className="drop-shadow-glow mt-10 text-center text-2xl font-bold text-white">
              University of Auckland's Official Indian Club
            </h1>
            <div className="flex justify-center">
              <img
                src={auisAbbrev}
                alt="AUIS logo"
                className="drop-shadow-glow h-auto w-[300px] max-w-lg rounded-lg lg:w-[500px]"
              />
            </div>
            <h2 className="drop-shadow-glow mb-5 mt-2 text-center text-2xl font-bold text-white">
              Not a member?
            </h2>
            <div className="flex justify-center">
              <button
                type="button"
                className="bg-primary-orange rounded-2xl px-10 py-3 text-3xl font-bold text-white"
              >
                Join us now!
              </button>
            </div>
          </div>

          <div className="hidden min-w-[150px] md:flex">
            <img
              src={auisHalfLogo}
              alt="AUIS logo"
              className="h-[300px] w-[150px] opacity-50 lg:h-[500px] lg:w-[250px]"
            />
          </div>
        </div>
      </div>
    </>
  )
}
