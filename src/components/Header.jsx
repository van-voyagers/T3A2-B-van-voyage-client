import React from 'react';
import { Link } from 'react-router-dom';
import VanVoyageHeaderLogo from '../assets/icons/van-voyage-header-logo.png';

function Header() {
  return (
    <header className="bg-voyage-green shadow-md p-4 flex justify-between items-center">
      <img src={VanVoyageHeaderLogo} alt="Van Voyage Logo" className="h-16"/>
      
      <nav>
        <ul className="flex space-x-4 font-roboto-mono text-uppercase">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/vans">Vans</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
