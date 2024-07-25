import peacockLogo from "../assets/peacock-logo.png";
import Socials from "./Socials";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="w-full bg-white px-10">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div className="flex items-center space-x-4">
            <img src={peacockLogo} alt="Peacock Logo" />
            <span className="font-bold text-black">
              &copy; AUIS {currentYear}. All Rights Reserved
            </span>
          </div>

          <Socials />
        </div>
      </footer>
    </>
  );
}
