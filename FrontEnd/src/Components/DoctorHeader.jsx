import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import Avatar from "./Avatar"

const DoctorHeader = () => {
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/doctor-dashboard">
            <Logo />
          </Link>

          <div className="w-full flex justify-end items-center">
            <Avatar />
          </div>
        </div>
      </header>
    </>
  );
};

export default DoctorHeader;
