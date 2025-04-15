import { Link } from "react-router-dom"
import Logo from "../assets/Logo.png"
const Header = () => {
    return (
      <header className="bg-white  flex justify-between items-center shadow-sm py-4 px-2 md:px-6">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-6 md:h-7 w-7 mr-[8px]" />
          <span className="text-blue-500 text-lg font-bold flex items-center md:text-2xl">
            Care Connect
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-blue-500">
            Home
          </a>
          <a href="#features" className="text-gray-600 hover:text-blue-500">
            Features
          </a>
          <a href="#about" className="text-gray-600 hover:text-blue-500">
            About
          </a>
          <a href="#contact" className="text-gray-600 hover:text-blue-500">
            Contact
          </a>
        </nav>
        <div className="flex items-center space-x-3">
          <Link to="sign-in" className="text-blue-500 hover:text-blue-700">
            Sign In
          </Link>
          <Link
            to="sign-up"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Get Started
          </Link>
        </div>
      </header>
    );
}

export default Header

