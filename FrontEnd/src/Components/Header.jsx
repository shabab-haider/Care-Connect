import React from "react";
import LogoAndBack from "./LogoAndBack";

const Header = () => {
  return (
    <div className="px-4 md:px-20 py-2 md:py-5 bg-white shadow-sm border-b sticky top-0 z-40">
      <LogoAndBack />
    </div>
  );
};

export default Header;
