import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import peacockLogo from "../assets/peacock-logo.png";
import whiteName from "../assets/auis_white.png";

function Header() {
  const [navBar, setNavBar] = useState(false);
  const { pathname } = useLocation();

  const titles = [
    { title: "Events", page: "/" },
    { title: "About Us", page: "/pvv" },
    { title: "Leadership Team", page: "/exec" },
    { title: "Credits", page: "/credits" },
  ];

  return (
    <header className="w-full bg-secondary-blue z-50 shadow h-[70px] px-[15px] flex items-center justify-between">
      <div className="flex items-center justify-between w-full lg:w-auto">
        <a className="flex items-center" href="/">
          <img
            className="object-contain w-[60px] h-[60px]"
            src={peacockLogo}
            alt="Peacock Logo"
          />
          <img
            className="object-contain w-[172px] h-[62px] ml-2"
            src={whiteName}
            alt="Logo Text"
          />
        </a>
        <div className="lg:hidden">
          <button type="button" onClick={() => setNavBar(!navBar)}>
            {navBar ? (
              <IoMdClose data-testid="close" className="text-white" size={40} />
            ) : (
              <IoMdMenu data-testid="menu" className="text-white" size={40} />
            )}
          </button>
        </div>
      </div>
      <nav
        className={`fixed top-0 right-0 h-full bg-secondary-blue p-8 z-40 transform transition-transform ${
          navBar ? "translate-x-0" : "translate-x-full"
        } lg:static lg:transform-none lg:p-0 lg:bg-transparent lg:flex lg:items-center lg:w-auto`}
      >
        <button
          type="button"
          className="absolute top-4 right-4 lg:hidden"
          onClick={() => setNavBar(false)}
        >
          <IoMdClose className="text-white" size={40} />
        </button>
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-5 lg:mt-0 mt-10 text-xl text-white">
          {titles.map((label) => (
            <li key={label.page} className="list-none">
              <Link
                to={label.page}
                className={`${
                  pathname === label.page ? "font-bold" : ""
                } hover:bg-[#05394d] px-3 py-2 rounded block lg:inline-block`}
                onClick={() => setNavBar(false)}
              >
                {label.title}
              </Link>
            </li>
          ))}
          <div className="flex flex-col lg:flex-row items-center gap-8 mt-4 lg:mt-0 lg:ml-8">
            <a href="/login">
              <button
                type="button"
                className="bg-primary-orange hover:bg-[#fc7300] text-black px-[18px] py-[10px] text-xl"
                style={{ borderRadius: "10px" }}
              >
                Log-in
              </button>
            </a>
            <a href="/signup">
              <button
                type="button"
                className="bg-primary-orange hover:bg-[#fc7300] text-black px-[18px] py-[10px] text-xl"
                style={{ borderRadius: "10px" }}
              >
                Sign-up
              </button>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
