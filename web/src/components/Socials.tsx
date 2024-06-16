import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function Socials() {
	return (
		<>
			<div className="w-60 flex justify-between items-center py-2" data-testid="socialsComponent">
				<div className="w-10 h-10 bg-primary-orange rounded-full hover:bg-light-pink cursor-pointer group">
					<a href="https://www.instagram.com/au.indiansociety/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-full h-full flex justify-center items-center">
						<FaInstagram className="text-white group-hover:text-black" data-testid="instagramLogo" />
					</a>
				</div>

				<div className="w-10 h-10 bg-primary-green rounded-full hover:bg-light-pink cursor-pointer group">
					<a href="https://www.facebook.com/auis.uoa/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-full h-full flex justify-center items-center">
						<FaFacebookF className="text-white group-hover:text-black" data-testid="facebookLogo" />
					</a>
				</div>

				<div className="w-10 h-10 bg-primary-orange rounded-full hover:bg-light-pink cursor-pointer group">
					<a href="mailto: au.indiansociety@gmail.com" aria-label="Email" className="w-full h-full flex justify-center items-center">
						<IoMdMail className="text-white group-hover:text-black" data-testid="emailLogo" />
					</a>
				</div>

				<div className="w-10 h-10 bg-primary-green rounded-full hover:bg-light-pink cursor-pointer group">
					<a href="https://www.linkedin.com/company/auindiansociety/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-full h-full flex justify-center items-center">
						<FaLinkedin className="text-white group-hover:text-black" data-testid="linkedinLogo" />
					</a>
				</div>
			</div>
		</>
	);
}
