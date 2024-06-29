import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import {
  InstagramLink,
  FacebookLink,
  EmailLink,
  LinkedinLink,
} from "../data/data";

export default function Socials() {
  return (
    <>
      <div className="w-60 flex justify-between items-center py-2">
        <div className="w-10 h-10 bg-primary-orange rounded-full hover:bg-light-pink cursor-pointer group">
          <a
            href={InstagramLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-full h-full flex justify-center items-center"
          >
            <FaInstagram className="text-white group-hover:text-black" />
          </a>
        </div>

        <div className="w-10 h-10 bg-primary-green rounded-full hover:bg-light-pink cursor-pointer group">
          <a
            href={FacebookLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-full h-full flex justify-center items-center"
          >
            <FaFacebookF className="text-white group-hover:text-black" />
          </a>
        </div>

        <div className="w-10 h-10 bg-primary-orange rounded-full hover:bg-light-pink cursor-pointer group">
          <a
            href={EmailLink}
            aria-label="Email"
            className="w-full h-full flex justify-center items-center"
          >
            <IoMdMail className="text-white group-hover:text-black" />
          </a>
        </div>

        <div className="w-10 h-10 bg-primary-green rounded-full hover:bg-light-pink cursor-pointer group">
          <a
            href={LinkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-full h-full flex justify-center items-center"
          >
            <FaLinkedin className="text-white group-hover:text-black" />
          </a>
        </div>
      </div>
    </>
  );
}
