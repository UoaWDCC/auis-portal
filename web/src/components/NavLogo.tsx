import peacockLogo from "../assets/peacock-logo.png";
import auisWhiteLogo from "../assets/auis_white.png";


function NavLogo() {

  return (
    <>
      {/* Logo */}
      <div className="ml-5">
        <a className="flex items-center" href="/">
          <img
            className="object-contain w-[70px] h-[70px]"
            src={peacockLogo}
            alt="Peacock Logo"
          />
          <img
            className="object-contain w-[120px] h-[60px] ml-2"
            src={auisWhiteLogo}
            alt="Logo Text"
          />
        </a>
      </div>
    </>
  );
}

export default NavLogo;
