import React from "react";
import BackButton from "./BackButton";
import Logo from "./Logo";

const LogoAndBack = () => {
  return (
    
      <div className="flex mb-3">
        <Logo />
        {/* Back to Home */}
        <div className="mt-3">
          <BackButton />
        </div>
      </div>
     
  );
};

export default LogoAndBack;
