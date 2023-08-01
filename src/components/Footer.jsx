import React from "react";
import VanVoyageFooterLogo from "../assets/icons/van-voyage-footer-logo.png";

function Footer() {
  return (
    <footer className="bg-voyage-green p-4 flex flex-col justify-center items-center border-voyage-white">
      <img
        src={VanVoyageFooterLogo}
        alt="Van Voyage Footer Logo"
        className="h-14 sm:h-20 md:h-32 lg:h-36"
      />
      <p className="text-voyage-white font-roboto font-extralight text-[8px] w-full text-center mt-2">
        ©2023 VAN VOYAGE
        <span 
        className="text-voyage-grey font-roboto font-extralight text-[12px] text-right md:flex justify-end -translate-y-4 translate-x-2 -mb-8 italic hidden">
          created for a final assignment by &nbsp; 
        <a href="https://github.com/jordanaston">JA</a>&nbsp;&&nbsp;
        <a href="https://github.com/JRBoland">JB</a>
        </span>
      </p>
      
    </footer>
  );
}

export default Footer;
