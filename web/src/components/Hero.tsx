import auisLogo from "../assets/peacock.png";
import auisAbbrev from "../assets/AUIS_black 3.png";

export default function Hero() {
  return (
    <>
      <div className=" min-h-[calc(100vh-70px)] bg-gradient-to-br from-orange-500 to-orange-50">
        <div className="p-4 flex-row">
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center">
            <div className="grid grid-rows-3 place-items-center">
              <img
                src={auisAbbrev}
                alt="AUIS logo"
                className="h-auto max-w-lg rounded-lg"
              />
              <p className="py: text-3xl text-black text-center font-bold justify-self-stretch pt-6">
                Not a member?
              </p>
              <div className="btn text-red-50 justify-self-stretch">
                Sign-Up
              </div>
            </div>
            <div>
              <img src={auisLogo} alt="AUIS logo" className="ml-70" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
