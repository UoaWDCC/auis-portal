import { FaFacebookF, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import {
  InstagramLink,
  FacebookLink,
  EmailLink,
  LinkedinLink,
  TiktokLink
} from "../../data/data";

export default function Socials() {
  return (
    <>
      <div className="flex w-60 items-center justify-between py-2">
      <div className="bg-primary-green hover:bg-AUIS-teal group h-10 w-10 cursor-pointer rounded-full transition-all hover:scale-110">
          <a
            href={TiktokLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="flex h-full w-full items-center justify-center"
          >
            <FaTiktok className="text-white" />
          </a>
        </div>

        <div className="bg-primary-orange hover:bg-AUIS-teal group h-10 w-10 cursor-pointer rounded-full transition-all hover:scale-110">
          <a
            href={InstagramLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-full w-full items-center justify-center"
          >
            <FaInstagram className="text-white" />
          </a>
        </div>

        <div className="bg-primary-green hover:bg-AUIS-teal group h-10 w-10 cursor-pointer rounded-full transition-all hover:scale-110">
          <a
            href={FacebookLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-full w-full items-center justify-center"
          >
            <FaFacebookF className="text-white" />
          </a>
        </div>

        <div className="bg-primary-orange hover:bg-AUIS-teal group h-10 w-10 cursor-pointer rounded-full transition-all hover:scale-110">
          <a
            href={"mailto:" + EmailLink}
            aria-label="Email"
            className="flex h-full w-full items-center justify-center"
          >
            <IoMdMail className="text-white" />
          </a>
        </div>

        <div className="bg-primary-green hover:bg-AUIS-teal group h-10 w-10 cursor-pointer rounded-full transition-all hover:scale-110">
          <a
            href={LinkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-full w-full items-center justify-center"
          >
            <FaLinkedin className="text-white" />
          </a>
        </div>
      </div>
    </>
  );
}
