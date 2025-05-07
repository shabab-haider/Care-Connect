import { useState, useEffect, useContext } from "react";
import Logo from "../../Components/Logo";
import { UserDataContext } from "../../Context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorProfileSetup = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const prev = user;
  // Form sections state
  const [activeSection, setActiveSection] = useState("basic");
  const [progress, setProgress] = useState(33); // Start with 33% for first section

  // Basic Information
  const [fullName, setFullName] = useState(user.fullName);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Professional Details
  const [specialty, setSpecialty] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");

  // Clinic Information
  const [clinicName, setClinicName] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [consultationStartTime, setConsultationStartTime] = useState("");
  const [consultationEndTime, setConsultationEndTime] = useState("");

  const basicDetails = { dateOfBirth, gender, phoneNumber };
  const clinicInfo = {
    clinicName,
    clinicAddress,
    consultationHours: { consultationStartTime, consultationEndTime },
  };
  const professionalDetails = { specialty, licenseNumber, yearsOfExperience };

  // Handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const doctorData = {
      ...prev,
      ...{
        basicInfo: basicDetails,
        professionalDetails: professionalDetails,
        clinicInfo: clinicInfo,
      },
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/doctors/register`,
      doctorData
    );
    if (response.status === 200) {
      setUser(response.data.doctor);
      localStorage.setItem("token", response.data.token);
      navigate("/Doctor-Dashboard");
    }
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <Logo />
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Complete Your Profile
            </h1>
            <p className="text-gray-600">
              Please provide your information to complete the account setup
            </p>
          </div>

          {/* Progress Tabs */}
          <div className="mb-8">
            <div className="flex justify-between border-b">
              <button
                className={`pb-2 px-4 text-center ${
                  activeSection === "basic"
                    ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                    : "text-gray-500"
                }`}
                onClick={() => handleSectionChange("basic")}
              >
                Basic Information
              </button>
              <button
                className={`pb-2 px-4 text-center ${
                  activeSection === "professional"
                    ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                    : "text-gray-500"
                }`}
                onClick={() => handleSectionChange("professional")}
              >
                Professional Details
              </button>
              <button
                className={`pb-2 px-4 text-center ${
                  activeSection === "clinic"
                    ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                    : "text-gray-500"
                }`}
                onClick={() => handleSectionChange("clinic")}
              >
                Clinic Information
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <form onSubmit={handleSubmit}>
              {/* Basic Information Section */}
              <div className={activeSection === "basic" ? "block" : "hidden"}>
                <h2 className="text-xl font-semibold mb-6">
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-gray-700 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={fullName}
                      disabled
                      required
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-gray-700 mb-2"
                    >
                      Date of Birth
                    </label>
                    <div className="relative">
                      <input
                        id="dateOfBirth"
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="MM/DD/YYYY"
                        value={dateOfBirth}
                        onChange={(e) => {
                          setDateOfBirth(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-gray-700 mb-2"
                    >
                      Gender
                    </label>
                    <div className="relative">
                      <select
                        id="gender"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                        value={gender}
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                        required
                      >
                        <option value="" disabled>
                          Select Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">
                          Prefer not to say
                        </option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        id="phoneNumber"
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+00 000-000-0000"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                        }}
                        required
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition duration-200"
                    onClick={() => {
                      if (
                        !fullName ||
                        !dateOfBirth ||
                        !gender ||
                        !phoneNumber
                      ) {
                        alert("Please fill all the fields");
                      } else {
                        handleSectionChange("professional");
                      }
                    }}
                  >
                    Next: Professional Details
                  </button>
                </div>
              </div>

              {/* Professional Details Section */}
              <div
                className={
                  activeSection === "professional" ? "block" : "hidden"
                }
              >
                <h2 className="text-xl font-semibold mb-6">
                  Professional Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Medical Specialty */}
                  <div>
                    <label
                      htmlFor="specialty"
                      className="block text-gray-700 mb-2"
                    >
                      Medical Specialty
                    </label>
                    <div className="relative">
                      <select
                        id="specialty"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                        value={specialty}
                        onChange={(e) => {
                          setSpecialty(e.target.value);
                        }}
                        required
                      >
                        <option value="" disabled>
                          Select Specialty
                        </option>
                        <option value="cardiology">Cardiology</option>
                        <option value="dermatology">Dermatology</option>
                        <option value="endocrinology">Endocrinology</option>
                        <option value="gastroenterology">
                          Gastroenterology
                        </option>
                        <option value="neurology">Neurology</option>
                        <option value="obstetrics">
                          Obstetrics & Gynecology
                        </option>
                        <option value="oncology">Oncology</option>
                        <option value="pediatrics">Pediatrics</option>
                        <option value="psychiatry">Psychiatry</option>
                        <option value="surgery">Surgery</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* License Number */}
                  <div>
                    <label
                      htmlFor="licenseNumber"
                      className="block text-gray-700 mb-2"
                    >
                      License Number
                    </label>
                    <div className="relative">
                      <input
                        id="licenseNumber"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter license number"
                        value={licenseNumber}
                        onChange={(e) => {
                          setLicenseNumber(e.target.value);
                        }}
                        required
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Years of Experience */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="yearsOfExperience"
                      className="block text-gray-700 mb-2"
                    >
                      Years of Experience
                    </label>
                    <input
                      id="yearsOfExperience"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Years of experience"
                      value={yearsOfExperience}
                      onChange={(e) => {
                        setYearsOfExperience(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col-reverse md:flex-row justify-between">
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700 px-6 py-2 transition duration-200"
                    onClick={() => handleSectionChange("basic")}
                  >
                    Back to Basic Information
                  </button>
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-600 text-white  rounded-md transition duration-200 px-6 py-2"
                    onClick={() => {
                      if (!specialty || !licenseNumber || !yearsOfExperience) {
                        alert("Please fill all the fields");
                      } else {
                        handleSectionChange("clinic");
                      }
                    }}
                  >
                    Next: Clinic Information
                  </button>
                </div>
              </div>

              {/* Clinic Information Section */}
              <div className={activeSection === "clinic" ? "block" : "hidden"}>
                <h2 className="text-xl font-semibold mb-6">
                  Clinic Information
                </h2>

                <div className="space-y-6 mb-6">
                  {/* Clinic Name */}
                  <div>
                    <label
                      htmlFor="clinicName"
                      className="block text-gray-700 mb-2"
                    >
                      Clinic Name
                    </label>
                    <div className="relative">
                      <input
                        id="clinicName"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter clinic name"
                        value={clinicName}
                        onChange={(e) => {
                          setClinicName(e.target.value);
                        }}
                        required
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Clinic Address */}
                  <div>
                    <label
                      htmlFor="clinicAddress"
                      className="block text-gray-700 mb-2"
                    >
                      Clinic Address
                    </label>
                    <div className="relative">
                      <input
                        id="clinicAddress"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter clinic address"
                        value={clinicAddress}
                        onChange={(e) => {
                          setClinicAddress(e.target.value);
                        }}
                        required
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Consultation Hours */}
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Consultation Hours
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <input
                          type="time"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={consultationStartTime}
                          onChange={(e) => {
                            setConsultationStartTime(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="time"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={consultationEndTime}
                          onChange={(e) => {
                            setConsultationEndTime(e.target.value);
                          }}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col-reverse md:flex-row justify-between">
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700 px-6 py-2 transition duration-200"
                    onClick={() => handleSectionChange("professional")}
                  >
                    Back to Professional Details
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition duration-200 flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Complete Setup
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileSetup;
