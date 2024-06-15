import { FaFacebook, FaInstagram } from "react-icons/fa";
import peacockLogo from "../assets/peacock-logo.png";
import whiteName from "../assets/auis_white.png";
import {
  FacebookLink,
  InstagramLink,
  LinkedinLink,
  githubLink,
} from "../data/data";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-secondary-blue flex flex-col justify-between px-4 sm:px-6 md:px-8 bottom-0">
      <div className="flex flex-col md:flex-row justify-between items-center py-3">
        <div className="text-lg text-white flex items-center mb-4 md:mb-0">
          <img
            src={peacockLogo}
            alt="Peacock Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <img
            src={whiteName}
            alt="Logo Text"
            width={70}
            height={70}
            className="mr-3"
          />
          <span>© {currentYear}</span>
        </div>
        <div className="flex space-x-4">
          <a
            aria-label="Facebook Link"
            href={FacebookLink}
            rel="noreferrer"
            target="_blank"
          >
            <FaFacebook
              className="hover:-translate-y-1 transition-transform cursor-pointer text-white"
              size={40}
            />
          </a>
          <a
            aria-label="Instagram Link"
            href={InstagramLink}
            rel="noreferrer"
            target="_blank"
          >
            <FaInstagram
              name="Instagram"
              className="hover:-translate-y-1 transition-transform cursor-pointer text-white"
              size={40}
            />
          </a>
          <a
            aria-label="Linkedin Link"
            href={LinkedinLink}
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineLinkedin
              name="Linkedin"
              className="hover:-translate-y-1 transition-transform cursor-pointer text-white"
              size={40}
            />
          </a>
          <a
            aria-label="Github Link"
            href={githubLink}
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineGithub
              name="Github"
              className="hover:-translate-y-1 transition-transform cursor-pointer text-white"
              size={40}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
