import React from 'react'
import Logo_img from "../assets/Logo.png"
import { Link } from 'react-router-dom'


const Logo = () => {

  return (
    <>
      <div className="container mx-auto">
        <div className="flex items-center">
          <img src={Logo_img} alt="Logo" className="h-6 w-6" />
          <span className="ml-2 pt-1 text-2xl font-bold text-blue-600 whitespace-nowrap">
            Care Connect
          </span>
        </div>
      </div>
    </>
  );
}

export default Logo
