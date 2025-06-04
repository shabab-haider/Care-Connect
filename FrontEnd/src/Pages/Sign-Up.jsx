import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import SignUp_Image from "../assets/SignUp_image.png";
import { PatientDataContext } from "../Context/PatientContext";
import { DoctorDataContext } from "../Context/DoctorContext";
import axios from "axios";

const SignUp = () => {
  const [signUpType, setSignUpType] = useState("patient");
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const { patient, setpatient } = useContext(PatientDataContext);
  const { doctor, setDoctor } = useContext(DoctorDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/${signUpType}s/checkemail`,
      { email }
    );
    if (response.data == "Email Exist") {
      return alert("Email Exists");
    } else {
      if (password != confirmPassword) {
        return console.log("password dose'nt match..");
      }
      if (signUpType == "patient")
        setpatient({
          fullname,
          email,
          password,
        });
      if (signUpType == "doctor")
        setDoctor({
          fullname,
          email,
          password,
        });
      navigate(`/${signUpType}-Profile-Setup`);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Left Section - Sign Up Form */}
      <div className="w-full p-6 lg:w-1/2 flex flex-col px-6 sm:px-12 justify-center">
        <div className="mb-6 flex justify-center lg:justify-start">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-6 w-6 mb-1 mr-1" />
            <span className="text-lg font-bold text-gray-800">
              Care Connect
            </span>
          </Link>
        </div>

        {/* Sign Up Type Toggle */}
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 px-3 ${
              signUpType === "patient"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-500"
            } rounded-l-md transition-colors`}
            onClick={() => setSignUpType("patient")}
          >
            Patient Sign-Up
          </button>
          <button
            className={`flex-1 py-2 px-3 ${
              signUpType === "doctor"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-500"
            } rounded-r-md transition-colors`}
            onClick={() => setSignUpType("doctor")}
          >
            Doctor Sign-Up
          </button>
        </div>

        <h1 className="text-xl font-bold text-gray-800 mb-4 text-center lg:text-left">
          Create your account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-md mx-auto w-full"
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullname"
              className="block text-gray-700 mb-1 font-semibold"
            >
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Full name"
              value={fullname}
              onChange={(e) => setfullname(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 mb-1 font-semibold"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 mb-1 font-semibold"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 mb-1 font-semibold"
            >
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Terms */}
          {/* <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              required
            />
            <label htmlFor="terms" className="ml-2 text-gray-600">
              I agree to the{" "}
              <Link to="/terms" className="text-blue-500 hover:text-blue-700">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-blue-500 hover:text-blue-700">
                Privacy Policy
              </Link>
            </label>
          </div> */}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-blue-500 hover:text-blue-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-500 items-center justify-center relative">
        <img
          src={SignUp_Image}
          alt="Medical equipment"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
    </div>
  );
};

export default SignUp;
