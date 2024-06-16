import peacockLogo from "../assets/peacock-logo.png";
import Socials from "./Socials";

export default function Footer() {
	const currentYear = new Date().getFullYear();
	return (
		<>
			<footer className="w-full bg-white px-10 absolute bottom-0">
				<div className="flex flex-col lg:flex-row justify-between items-center">
					<div className="flex items-center space-x-4">
						<img src={peacockLogo} alt="Peacock Logo" />
						<span className="text-black font-bold">&copy; AUIS {currentYear}. All Rights Reserved</span>
					</div>

					<Socials />
				</div>
			</footer>
		</>
	);
}
