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
    <header className="w-full bg-[#034159] fixed top-0 z-50 shadow h-[90px] px-[15px] flex items-center justify-between">
      <div className="justify-between lg:items-center lg:flex w-full">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <a className="flex items-center" href="/">
            <img
              className="object-contain w-[70px] h-[70px]"
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
            <button onClick={() => setNavBar(!navBar)}>
              {navBar ? (
                <IoMdClose className="text-white" size={40} />
              ) : (
                <IoMdMenu className="text-white" size={40} />
              )}
            </button>
          </div>
        </div>
        <nav
          className={`lg:flex lg:items-center w-full lg:w-auto ${
            navBar ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col text-white lg:flex-row items-center gap-8 text-xl">
            {titles.map((label, index) => (
              <li key={index}>
                <Link
                  to={label.page}
                  className={`${
                    pathname === label.page ? "font-bold" : "text-white"
                  } hover:bg-[#05394d] px-3 py-2 rounded`}
                  onClick={() => setNavBar(!navBar)}
                >
                  {label.title}
                </Link>
              </li>
            ))}
            <div className="flex flex-col lg:flex-row items-center gap-8 mt-4 lg:mt-0 lg:ml-8">
              <a href="/login">
                <button
                  className="bg-[#FC8700] hover:bg-[#fc7300] text-black px-[18px] py-[10px] text-xl"
                  style={{ borderRadius: "10px" }}
                >
                  Log-in
                </button>
              </a>
              <a href="/signup">
                <button
                  className="bg-[#FC8700] hover:bg-[#fc7300] text-black px-[18px] py-[10px] text-xl"
                  style={{ borderRadius: "10px" }}
                >
                  Sign-up
                </button>
              </a>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
