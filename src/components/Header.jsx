import React, { useContext, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import VanVoyageHeaderLogo from "../assets/icons/van-voyage-header-logo.png";
import MobileMenu from "./MobileMenu";
import { UserContext } from "../components/UserContext";

function Header() {
  // Get current URL path
  const location = useLocation();

  // Get navigate function for routing
  const navigate = useNavigate();

  // Access user token, logout function, and loading state from UserContext
  const { token, logout, loading } = useContext(UserContext);

  // Log the token value whenever it changes
  useEffect(() => {
    console.log("Token in header:", token);
  }, [token]);

  // Check if the current location matches the passed path to manage active link styles
  const getNavLinkClass = (path) => {
    return location.pathname === path ? "font-normal" : "";
  };

  // Handle user logout action: invoke logout and navigate to home page
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // If the app is in loading state, render nothing (or a loading indicator could go here)
  if (loading) {
    return null;
  }

  return (
    <header className="bg-voyage-green shadow-xl p-4 flex justify-between items-center">
      <Link to="/">
        <img
          src={VanVoyageHeaderLogo}
          alt="Van Voyage Logo"
          className="h-10 sm:h-10 md:h-12 lg:h-14"
        />
      </Link>

      <nav className="hidden md:flex">
        <ul className="flex items-center md:space-x-4 lg:space-x-10 pr-6 font-roboto text-sm md:text-sm lg:text-lg font-extralight text-voyage-white">
          <li className={getNavLinkClass("/")}>
            <NavLink
              to="/"
              className="transition-all duration-100 border-b border-transparent hover:border-voyage-white"
            >
              HOME
            </NavLink>
          </li>
          <li className={getNavLinkClass("/about")}>
            <NavLink
              to="/about"
              className="transition-all duration-100 border-b border-transparent hover:border-voyage-white"
            >
              ABOUT
            </NavLink>
          </li>
          <li className={getNavLinkClass("/vans")}>
            <NavLink
              to="/vans"
              className="transition-all duration-100 border-b border-transparent hover:border-voyage-white"
            >
              VANS
            </NavLink>
          </li>
          <li className={getNavLinkClass("/contact")}>
            <NavLink
              to="/contact"
              className="transition-all duration-100 border-b border-transparent hover:border-voyage-white"
            >
              CONTACT
            </NavLink>
          </li>
          {token ? (
            <>
              <li className={getNavLinkClass("/account")}>
                <NavLink
                  to="/account"
                  className="transition-all duration-100 border-b border-transparent hover:border-voyage-white"
                >
                  ACCOUNT
                </NavLink>
              </li>
              <li className={getNavLinkClass("/logout")}>
                <a
                  onClick={handleLogout}
                  className="cursor-pointer transition-all duration-100 border-b border-transparent hover:border-voyage-white"
                >
                  LOG OUT
                </a>
              </li>
            </>
          ) : (
            <>
              <li className={getNavLinkClass("/login")}>
                <NavLink
                  to="/login"
                  className="transition-all duration-100 border-b border-transparent hover:border-voyage-white"
                >
                  LOGIN
                </NavLink>
              </li>
              <li className={getNavLinkClass("/signup")}>
                <NavLink
                  to="/signup"
                  className="transition-all duration-100 border-b border-transparent hover:border-voyage-white"
                >
                  SIGN UP
                </NavLink>
              </li>
            </>
          )}
          <li className="border border-voyage-white font-light px-2 py-1">
            <NavLink
              to="/vans"
              className="transition-all duration-100 border-b border-transparent hover:border-voyage-white"
            >
              BOOK NOW
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="md:hidden">
        <MobileMenu />
      </div>
    </header>
  );
}

export default Header;
