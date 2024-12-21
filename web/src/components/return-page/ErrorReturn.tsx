import { useNavigate } from "react-router";
import { EmailLink } from "../../data/data";


export default function ErrorReturn() {
  const navigate = useNavigate();
    return (
        <>
          <div className="from-AUIS-dark-teal to-AUIS-teal min-h-svh bg-gradient-to-b pb-20">
            <div className="flex items-center justify-center pt-36">
              <div>
                <h1 className="mx-3 pb-2 text-center text-5xl font-bold text-white">
                  Payment Failed
                </h1>
              </div>
            </div>
            <div>
              <p className="pt-12 text-center text-white">
                Please try again, or contact{" "}
                <a className="text-blue-500" href={`mailto:${EmailLink}`}>
                  {EmailLink}
                </a>
                .
              </p>
            </div>
  
            <div className="flex justify-center">
              <button
                type="button"
                className="bg-primary-orange mt-24 rounded-2xl px-10 py-3 text-3xl font-bold text-white transition-all hover:scale-110"
                onClick={() => {
                  navigate("/");
                }}
              >
                Return to Home screen
              </button>
            </div>
          </div>
        </>
      );
}