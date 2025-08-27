import { useContext, useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, Phone, Calendar } from "lucide-react";
import LogoAndBack from "../../Components/LogoAndBack";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { PatientDataContext } from "../../Context/PatientContext";
import { toast } from "react-toastify";

const PatientSignup = () => {
  const navigate = useNavigate();
  const { patient, setPatient } = useContext(PatientDataContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  // Email verification state variables
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showVerificationField, setShowVerificationField] = useState(false);
  const [code, setCode] = useState();
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationLoading, setIsVerificationLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Prevent numbers in first and last name fields
    if ((name === "firstName" || name === "lastName") && /\d/.test(value)) {
      return; // Don't update state if numbers are detected
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Function to send verification code
  const handleSendVerificationCode = async () => {
    if (!formData.email || !formData.email.includes("@")) {
      toast.error("Please enter a valid email address first");
      return;
    }

    setIsVerificationLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/email/sendCode`,
        {
          email: formData.email,
        }
      );
      if (response.status == "200") {
        setCode(response.data.toString());
        setShowVerificationField(true);
        setIsVerificationLoading(false);
        toast.success("Verification code sent to your email!");
      }
    } catch (error) {
      setIsVerificationLoading(false);
      toast.error("Failed to send verification code. Please try again.");
    }
  };

  // Function to verify email code
  const handleVerifyEmail = async () => {
    if (!verificationCode || verificationCode.length < 6) {
      toast.error("Please enter a valid verification code");
      return;
    }

    setIsVerificationLoading(true);
    try {
      if (verificationCode === code) {
        setIsEmailVerified(true);
        setIsVerificationLoading(false);
        toast.success("Email verified successfully!");
      } else {
        setIsVerificationLoading(false);
        toast.error("Invalid verification code. Please try again.");
      }
    } catch (error) {
      setIsVerificationLoading(false);
      toast.error("Verification failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email is verified
    if (!isEmailVerified) {
      toast.error("Please verify your email address before proceeding");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    const payload = {
      fullname: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
      phoneNumber: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      profileImage: "",
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/patients/register`,
        payload
      );
      if (response.status == "201") {
        localStorage.clear();
        const token = response.data.token;
        localStorage.setItem("token", token);
        const patientDetails = response.data.patient;
        setPatient(patientDetails);
        toast.success("SignedUp Successfully");
        navigate("/patient-dashboard");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border">
          {/* Header */}
          <div className="text-center mb-8">
            <LogoAndBack />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Create Patient Account
            </h2>
            <p className="text-gray-600">
              Join thousands of patients for better healthcare
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    minLength={3}
                    required
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                      formData.firstName && formData.firstName.length < 3
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder="First name"
                  />
                </div>
                {formData.firstName && formData.firstName.length < 3 && (
                  <p className="text-red-500 text-sm mt-1">
                    First name must be at least 3 characters long
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    minLength={3}
                    required
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                      formData.lastName && formData.lastName.length < 3
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder="Last name"
                  />
                </div>
                {formData.lastName && formData.lastName.length < 3 && (
                  <p className="text-red-500 text-sm mt-1">
                    Last name must be at least 3 characters long
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isEmailVerified}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    isEmailVerified
                      ? "border-green-500 bg-green-50 focus:ring-green-500 focus:border-green-500"
                      : formData.email && !formData.email.includes("@")
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="Enter your email"
                />
                {isEmailVerified && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                    ✓
                  </div>
                )}
              </div>
              {formData.email && !formData.email.includes("@") && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid email address
                </p>
              )}
              {isEmailVerified && (
                <p className="text-green-500 text-sm mt-1">
                  Email verified successfully!
                </p>
              )}

              {/* Send Verification Code Button */}
              {!isEmailVerified &&
                !showVerificationField &&
                formData.email &&
                formData.email.includes("@") && (
                  <button
                    type="button"
                    onClick={handleSendVerificationCode}
                    disabled={isVerificationLoading}
                    className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm rounded-lg transition-colors"
                  >
                    {isVerificationLoading
                      ? "Sending..."
                      : "Send Verification Code"}
                  </button>
                )}

              {/* Verification Code Field */}
              {showVerificationField && !isEmailVerified && (
                <div className="mt-3 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Enter Verification Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      className="flex-1 py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyEmail}
                      disabled={isVerificationLoading || !verificationCode}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-sm rounded-lg transition-colors"
                    >
                      {isVerificationLoading ? "Verifying..." : "Verify"}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Check your email for the verification code
                  </p>
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  minLength={10}
                  required
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    formData.phone && formData.phone.length < 10
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="Enter your phone number"
                />
              </div>
              {formData.phone && formData.phone.length < 10 && (
                <p className="text-red-500 text-sm mt-1">
                  Phone number must be at least 10 digits
                </p>
              )}
            </div>

            {/* Date of Birth & Gender */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    max={new Date().toISOString().split("T")[0]}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                      formData.dateOfBirth &&
                      new Date(formData.dateOfBirth) > new Date()
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                  />
                </div>
                {formData.dateOfBirth &&
                  new Date(formData.dateOfBirth) > new Date() && (
                    <p className="text-red-500 text-sm mt-1">
                      Date of birth cannot be in the future
                    </p>
                  )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  minLength={8}
                  required
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    formData.password && formData.password.length < 8
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {formData.password && formData.password.length < 8 && (
                <p className="text-red-500 text-sm mt-1">
                  Password must be at least 8 characters long
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    formData.confirmPassword &&
                    formData.confirmPassword !== formData.password
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {formData.confirmPassword &&
                formData.confirmPassword !== formData.password && (
                  <p className="text-red-500 text-sm mt-1">
                    Passwords do not match
                  </p>
                )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isEmailVerified}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl ${
                isEmailVerified
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-400 cursor-not-allowed text-gray-700"
              }`}
            >
              {isEmailVerified
                ? "Create Patient Account"
                : "Verify Email to Continue"}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSignup;
