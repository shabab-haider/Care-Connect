import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signIn_image from "../assets/signIn_Image.png";
import Logo from "../assets/Logo.png";
import axios from "axios";
import { PatientDataContext } from "../Context/PatientContext";
import { DoctorDataContext } from "../Context/DoctorContext";

const SignIn = () => {
  const [loginType, setLoginType] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { patient, setpatient } = useContext(PatientDataContext);
  const { doctor, setDoctor } = useContext(DoctorDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/${loginType}s/login`,
        data
      );

      if (response.status === 200) {
        if (loginType == "patient") {
          setpatient(response.data.patient);
        }
        if (loginType == "doctor") {
          setDoctor(response.data.doctor);
        }
        localStorage.setItem("token", response.data.token);
        toast.success("LoggedIn Sucessfully");
        navigate(`/${loginType}-dashboard`);
      }
    } catch (error) {
      toast.error("Invalid Carenditials");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-10 lg:p-20 justify-center h-screen">
        <div className="mb-10">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-7 w-7 mr-2" />
            <span className="ml-2 text-xl font-bold text-gray-800">
              Care Connect
            </span>
          </Link>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500">Please enter your details to sign in</p>
        </div>

        {/* Login Type Toggle */}
        <div className="flex mb-6">
          <button
            className={`flex-1 py-3 border border-gray-300 rounded-l-md ${
              loginType === "patient"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-500"
            }`}
            onClick={() => setLoginType("patient")}
          >
            Patient Login
          </button>
          <button
            className={`flex-1 py-3 border border-gray-300 rounded-r-md ${
              loginType === "doctor"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-500"
            }`}
            onClick={() => setLoginType("doctor")}
          >
            Doctor Login
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-grow flex flex-col justify-between"
        >
          <div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  id="email"
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">
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
                  type="password"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <div>
                                <Link to="/forgot-password" className="text-sm text-blue-500 hover:text-blue-700">
                                    Forgot password?
                                </Link>
                            </div>
            </div> */}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition duration-200"
          >
            Sign in
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-500 hover:text-blue-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section - Image and Text */}
      <div className="hidden lg:block lg:w-1/2 bg-blue-50">
        <div className="h-full relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              <img
                src={signIn_image}
                alt="Healthcare professional"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute bottom-20 left-10 right-10 text-white">
                <h2 className="text-4xl font-bold mb-4">
                  Your Health, Our Priority
                </h2>
                <p className="text-lg">
                  Connect with trusted healthcare professionals and manage your
                  appointments with ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
