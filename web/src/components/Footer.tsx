import { FaFacebook, FaInstagram } from "react-icons/fa";
import peacockLogo from "../assets/peacock-logo.png";
import whiteName from "../assets/auis_white.png";
import { FacebookLink, InstagramLink, LinkedinLink } from "../data/data";
import { AiOutlineLinkedin } from "react-icons/ai";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-[#034159] flex flex-col justify-between px-4 sm:px-6 md:px-8 fixed bottom-0">
      <div className="flex justify-between items-center py-3">
        <div className="text-xl text-white flex items-center">
          <img
            src={peacockLogo}
            alt="logo"
            width={40}
            height={40}
            className="mr-3"
          />
          <span>© {currentYear}</span>
          <img
            src={whiteName}
            alt="logo"
            width={50}
            height={50}
            className="ml-3"
          />
        </div>
        <div className="flex space-x-4">
          <a href={FacebookLink} rel="noreferrer" target="_blank">
            <FaFacebook
              className="hover:-translate-y-1 transition-transform cursor-pointer text-white"
              size={40}
            />
          </a>
          <a href={InstagramLink} rel="noreferrer" target="_blank">
            <FaInstagram
              className="hover:-translate-y-1 transition-transform cursor-pointer text-white"
              size={40}
            />
          </a>
          <a href={LinkedinLink} rel="noreferrer" target="_blank">
            <AiOutlineLinkedin
              className="hover:-translate-y-1 transition-transform cursor pointer text-white"
              size={40}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
