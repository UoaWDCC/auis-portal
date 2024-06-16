import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function NavLinks() {
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
      {/* Nav links flex-grow */}
      
      <nav className="flex-grow">
        <div className="flex items-center h-full justify-center text-xl font-bold text-white">
          {titles.map((label) => (
            <li key={label.page} className="list-none">
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
        </div>
      </nav>
    </>
  );
}

export default NavLinks;
