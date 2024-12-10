import { PiRobotBold } from "react-icons/pi";
import { useNavigate } from "react-router";

export default function ErrorScreen() {
  const navigate = useNavigate();

  console.log(window.location.pathname);
  return (
    <div className="from-AUIS-dark-teal to-AUIS-teal h-svh bg-gradient-to-b pb-20">
      <div className="flex h-full items-center justify-center">
        <div>
          <div className="flex items-center justify-center">
            <PiRobotBold color="white" className="h-56 w-56" />
          </div>
          {window.location.pathname == "/error" ? (
            <h1 className="text-center text-4xl text-white">
              {"Oops... an error has occurred :("}
            </h1>
          ) : (
            <h1 className="text-center text-6xl text-white">
              {"404 page not found :("}
            </h1>
          )}
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-primary-orange mt-12 rounded-2xl px-10 py-3 text-3xl font-bold text-white transition-all hover:scale-110"
              onClick={() => {
                navigate("/");
              }}
            >
              Return to Home screen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
