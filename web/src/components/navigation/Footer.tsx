import { useNavigate } from "react-router";
import peacockLogo from "../../assets/peacock_logo.png";
import Socials from "./Socials";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  return (
    <>
      <footer className="w-full bg-white px-10">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div className="flex flex-wrap items-center justify-center">
            <div>
              <div className="flex items-center space-x-4">
                <img src={peacockLogo} alt="Peacock Logo" />
                <span className="font-bold text-black">
                  &copy; AUIS {currentYear}. All Rights Reserved
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate("/credits")}
              className="bg-primary-orange mx-5 my-3 mr-5 rounded-3xl px-6 py-1 font-bold text-white transition-all hover:scale-110"
            >
              Website Credits
            </button>
          </div>
          <Socials />
        </div>
      </footer>
    </>
  );
}
