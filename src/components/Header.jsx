import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import VanVoyageHeaderLogo from "../assets/icons/van-voyage-header-logo.png";

function Header() {
  const location = useLocation();

  const getNavLinkClass = (path) => {
    return location.pathname === path ? "font-medium" : "";
  };

  return (
    <header className="bg-voyage-green shadow-2xl p-4 flex justify-between items-center">
      <Link to="/">
        <img src={VanVoyageHeaderLogo} alt="Van Voyage Logo" className="h-14" />
      </Link>

      <nav>
        <ul className="flex items-center space-x-10 pr-6 font-roboto font-extralight text-uppercase text-voyage-white">
          <li className={getNavLinkClass("/")}>
            <NavLink
              to="/"
              className="transition-all duration-300 hover:font-medium"
            >
              HOME
            </NavLink>
          </li>
          <li className={getNavLinkClass("/about")}>
            <NavLink
              to="/about"
              className="transition-all duration-300 hover:font-medium"
            >
              ABOUT
            </NavLink>
          </li>
          <li className={getNavLinkClass("/vans")}>
            <NavLink
              to="/vans"
              className="transition-all duration-300 hover:font-medium"
            >
              VANS
            </NavLink>
          </li>
          <li className={getNavLinkClass("/contact")}>
            <NavLink
              to="/contact"
              className="transition-all duration-300 hover:font-medium"
            >
              CONTACT
            </NavLink>
          </li>
          <li className={getNavLinkClass("/login")}>
            <NavLink
              to="/login"
              className="transition-all duration-300 hover:font-medium"
            >
              LOGIN
            </NavLink>
          </li>
          <li className={getNavLinkClass("/signup")}>
            <NavLink
              to="/signup"
              className="transition-all duration-300 hover:font-medium"
            >
              SIGN UP
            </NavLink>
          </li>
          <li className="border border-voyage-white font-light px-2 py-1">
            <NavLink
              to="/vans"
              className="transition-all duration-300 hover:font-medium"
            >
              BOOK NOW
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
