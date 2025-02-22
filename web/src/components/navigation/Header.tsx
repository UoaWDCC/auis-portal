import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import peacockLogo from "../../assets/peacock_logo.png";
import auisWhiteLogo from "../../assets/auis_white.png";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import LoadingSpinner from "@components/navigation/LoadingSpinner";
import { signOut } from "supertokens-web-js/recipe/session";

export default function Header() {
  const [navBar, setNavBar] = useState(false);
  const { pathname } = useLocation();
  const session = useSessionContext();

  async function onLogout() {
    await signOut();
    window.location.href = "/";
  }

  const titles = [
    { title: "Events", page: "/events" },
    { title: "About Us", page: "/aboutus" },
    { title: "Team", page: "/exec" },
    { title: "Sponsors", page: "/sponsors" },
    { title: "Membership", page: "/membership" },
  ];

  if (session.loading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <header className="py-5 xl:py-8">
        <div className="flex bg-transparent">
          {/* Logo */}
          <div className="ml-5 transition-all hover:scale-105">
            <a className="flex items-center" href="/">
              <img
                className="h-[50px] w-[50px] object-contain xl:h-[70px] xl:w-[70px]"
                src={peacockLogo}
                alt="Peacock Logo"
              />
              <img
                className="ml-2 h-[30px] w-[60px] object-contain xl:h-[60px] xl:w-[120px]"
                src={auisWhiteLogo}
                alt="Logo Text"
              />
            </a>
          </div>
          <div className="flex grow xl:hidden"> </div>
          <div className="justify-center xl:hidden">
            <button
              className="h-full"
              type="button"
              onClick={() => setNavBar(!navBar)}
            >
              {navBar ? (
                <IoMdClose
                  data-testid="close"
                  className="text-white"
                  size={40}
                />
              ) : (
                <IoMdMenu
                  data-testid="menu"
                  className="mr-5 text-white transition-all hover:scale-110"
                  size={40}
                />
              )}
            </button>
          </div>
          <nav
            className={`bg-secondary-blue fixed right-0 top-0 z-40 h-full transform p-8 transition-transform ${
              navBar ? "translate-x-0" : "translate-x-full"
            } xl:relative xl:h-full xl:w-auto xl:flex-grow xl:transform-none xl:items-center xl:self-center xl:bg-transparent xl:p-0`}
          >
            <button
              type="button"
              className="absolute right-4 top-4 xl:hidden"
              onClick={() => setNavBar(false)}
            >
              <IoMdClose
                className="hover:bg-AUIS-teal text-white transition-all"
                size={40}
              />
            </button>
            <div className="flex h-full flex-col text-xl font-bold text-white xl:flex-row xl:items-center xl:justify-center">
              {titles.map((label) => (
                <li key={label.page} className="my-2 list-none">
                  <Link
                    to={label.page}
                    className={`${
                      pathname === label.page ? "text-primary-orange" : ""
                    } hover:bg-AUIS-teal mx-3 rounded px-3 py-2 transition-all`}
                    onClick={() => setNavBar(false)}
                  >
                    {label.title}
                  </Link>
                </li>
              ))}
              <div>
                {session.userId ? (
                  <div className="mt-8 flex flex-col items-center text-xl font-bold text-white xl:hidden xl:flex-row">
                    <button
                      data-testid="sign-out-mobile"
                      type="button"
                      className="bg-primary-orange rounded-3xl px-6 py-1 transition-all hover:scale-110"
                      onClick={onLogout}
                    >
                      Sign-out
                    </button>
                  </div>
                ) : (
                  <div className="mt-8 flex flex-col items-center text-xl font-bold text-white xl:hidden xl:flex-row">
                    <a href="/login" className="my-2">
                      <button
                        data-testid="sign-in"
                        type="button"
                        className="bg-primary-green rounded-3xl px-6 py-1 transition-all hover:scale-110"
                      >
                        Sign-in
                      </button>
                    </a>
                    <a href="/signup" className="my-2">
                      <button
                        data-testid="Sign-up"
                        type="button"
                        className="bg-primary-orange rounded-3xl px-6 py-1 transition-all hover:scale-110"
                      >
                        Sign-up
                      </button>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </nav>
          <div className="mr-5 hidden xl:flex">
            <div className="flex h-full flex-col items-center text-xl font-bold text-white xl:flex-row">
              {session.userId ? (
                <div>
                  <button
                    data-testid="sign-out-mobile"
                    type="button"
                    className="bg-primary-orange rounded-3xl px-6 py-1 transition-all hover:scale-110"
                    onClick={onLogout}
                  >
                    Sign-out
                  </button>
                </div>
              ) : (
                <div>
                  <a href="/login" className="mx-4">
                    <button
                      data-testid="sign-in-mobile"
                      type="button"
                      className="bg-primary-green rounded-3xl px-6 py-1 transition-all hover:scale-110"
                    >
                      Sign-in
                    </button>
                  </a>
                  <a href="/signup" className="mx-4">
                    <button
                      data-testid="Sign-up-mobile"
                      type="button"
                      className="bg-primary-orange rounded-3xl px-6 py-1 transition-all hover:scale-110"
                    >
                      Sign-up
                    </button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
