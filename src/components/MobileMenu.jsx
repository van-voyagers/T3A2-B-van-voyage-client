import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MobileBurgerMenu from "../assets/icons/mobile-burger-menu.png";
import VanVoyageFooterLogo from "../assets/icons/van-voyage-footer-logo.png";
import VanVoyageHeaderLogo from "../assets/icons/van-voyage-header-logo.png";
import { UserContext } from "../components/UserContext";

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={handleClick}>
        <img
          src={MobileBurgerMenu}
          alt="Mobile Menu Image"
          className="w-10 pt-1 mr-1 sm:pt-3 sm:mr-3"
        />
      </button>

      <div
        className={`fixed inset-0 flex flex-col justify-between z-50 transition-transform duration-300 bg-voyage-green ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute top-2 w-full p-4 flex shadow-md justify-between items-center">
          <img
            src={VanVoyageHeaderLogo}
            alt="Van Voyage Logo"
            className="h-10"
          />
          <button
            onClick={handleClick}
            className="text-3xl mr-2 text-voyage-white font-extralight"
          >
            X
          </button>
        </div>

        <div className="flex flex-col items-start justify-center flex-grow ml-6 mt-16 font-roboto text-lg font-extralight text-voyage-white">
          <ul className="space-y-6">
            <li>
              <NavLink to="/" onClick={handleClick} className="block">
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={handleClick} className="block">
                ABOUT
              </NavLink>
            </li>
            <li>
              <NavLink to="/vans" onClick={handleClick} className="block">
                VANS
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={handleClick} className="block">
                CONTACT
              </NavLink>
            </li>
            {token ? (
              <>
                <li>
                  <NavLink to="/account" onClick={handleClick} className="block">
                    ACCOUNT
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} className="block">
                    LOG OUT
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login" onClick={handleClick} className="block">
                    LOGIN
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" onClick={handleClick} className="block">
                    SIGN UP
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/vans" onClick={handleClick} className="block">
                BOOK NOW
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center pb-4">
          <img
            src={VanVoyageFooterLogo}
            alt="Van Voyage Footer Logo"
            className="h-14"
          />
          <p className="text-voyage-white font-roboto font-extralight text-[8px] text-center mt-2">
            ©2023 VAN VOYAGE
          </p>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;



