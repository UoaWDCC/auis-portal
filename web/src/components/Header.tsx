import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import peacockLogo from "../assets/peacock-logo.png";
import auisWhiteLogo from "../assets/auis_white.png";
import { IoMdClose, IoMdMenu } from "react-icons/io";

function Header() {
  const [navBar, setNavBar] = useState(false);
  const { pathname } = useLocation();

  const titles = [
    { title: "Events", page: "/" },
    { title: "About Us", page: "/pvv" },
    { title: "Team", page: "/exec" },
    { title: "Partners", page: "/sponsors" },
    { title: "Credits", page: "/credits" },
  ];
  return (
    <>
      <header className="xl:py-8 py-5">
        <div className="bg-transparent flex">
          {/* Logo */}
          <div className="ml-5">
            <a className="flex items-center" href="/">
              <img
                className="object-contain w-[50px] h-[50px] xl:w-[70px] xl:h-[70px]"
                src={peacockLogo}
                alt="Peacock Logo"
              />
              <img
                className="object-contain w-[60px] h-[30px] xl:w-[120px] xl:h-[60px] ml-2"
                src={auisWhiteLogo}
                alt="Logo Text"
              />
            </a>
          </div>
          <div className="flex grow xl:hidden"> </div>
          {/* TEST */}
          <div className="xl:hidden justify-center">
            <button className=" h-full" type="button" onClick={() => setNavBar(!navBar)}>
              {navBar ? (
                <IoMdClose className="text-white" size={40} />
              ) : (
                <IoMdMenu className="text-white mr-5 " size={40} />
              )}
            </button>
          </div>
          {/* Nav links */}
          <nav
            className={`fixed top-0 right-0 h-full bg-secondary-blue p-8 z-40 transform transition-transform ${
              navBar ? "translate-x-0" : "translate-x-full"
            } xl:relative xl:self-center xl:transform-none xl:p-0 xl:bg-transparent xl:items-center xl:w-auto xl:flex-grow xl:h-full`}
          >
            <button
              type="button"
              className="absolute top-4 right-4 xl:hidden"
              onClick={() => setNavBar(false)}
            >
              <IoMdClose className="text-white" size={40} />
            </button>
            <div className="flex flex-col xl:flex-row xl:items-center h-full xl:justify-center text-xl font-bold text-white">
              {titles.map((label) => (
                <li key={label.page} className="list-none my-2">
                  <Link
                    to={label.page}
                    className={`${
                      pathname === label.page ? " text-primary-orange" : ""
                    } hover:bg-AUIS-teal px-3 py-2 rounded mx-3`}
                    onClick={() => setNavBar(false)}
                  >
                    {label.title}
                  </Link>
                </li>
              ))}
              {/* BUTTONS */}


              <div className="xl:hidden mt-8 flex flex-col xl:flex-row items-center font-bold text-xl text-white">
                <a href="/login" className="my-2">
                  <button
                    type="button"
                    className=" bg-primary-green px-6 py-1 rounded-3xl "
                  >
                    Login
                  </button>
                </a>
                <a href="/signup" className="my-2">
                  <button
                    type="button"
                    className=" bg-primary-orange px-6 py-1 rounded-3xl "
                  >
                    Sign up
                  </button>
                </a>
              </div>
            </div>

            

          </nav>
          {/* Buttons */}
          <div className="mr-5 hidden xl:flex">
            <div className="h-full flex flex-col xl:flex-row items-center font-bold text-xl text-white">
              <a href="/login" className="mx-4">
                <button
                  type="button"
                  className=" bg-primary-green px-6 py-1 rounded-3xl "
                >
                  Login
                </button>
              </a>
              <a href="/signup" className="mx-4">
                <button
                  type="button"
                  className=" bg-primary-orange px-6 py-1 rounded-3xl "
                >
                  Sign up
                </button>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
