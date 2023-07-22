import React from "react";
import VanVoyageFooterLogo from "../assets/icons/van-voyage-footer-logo.png";

function Footer() {
  return (
    <footer className="bg-voyage-green p-4 flex flex-col justify-center items-center">
      <img
        src={VanVoyageFooterLogo}
        alt="Van Voyage Footer Logo"
        className="h-14 sm:h-20 md:h-32 lg:h-40"
      />
      <p className="text-voyage-white font-roboto font-extralight text-[8px] text-center mt-2">
        ©2023 VAN VOYAGE
      </p>
    </footer>
  );
}

export default Footer;
