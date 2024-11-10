import { useNavigate } from "react-router";
import auisLogo from "../../assets/peacock_white_inner_big.png";

export default function NoEventFound() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="mx-3 pb-2 text-center text-5xl font-bold text-white">
        Oops...
      </h1>

      <div>
        <h1 className="text-center text-xl text-white">
          This event is not available at this time
        </h1>

        <div className="flex justify-center">
          <div className="">
            <img
              src={auisLogo}
              alt="AUIS Peacock Logo"
              className="w-[350px]"
            ></img>
          </div>
        </div>
        <div className="flex justify-center py-12">
          <button
            type="button"
            className="bg-primary-orange mx-3 rounded-2xl px-10 py-3 text-3xl font-bold text-white transition-all hover:scale-110"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to Home screen
          </button>
        </div>
      </div>
    </>
  );
}
