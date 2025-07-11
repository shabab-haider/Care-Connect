import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Components/Logo";
import { PatientDataContext } from "../../Context/PatientContext";
import axios from "axios";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { patient, setpatient } = useContext(PatientDataContext);
  console.log(patient)
  const [fullName, setFullName] = useState(patient.fullname);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  // const [newData, setNewData] = useState({});
  const prev = patient;
  useEffect(() => {
    
  }, [patient]);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit");
        return;
      }

      // Check file type
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Only JPG and PNG formats are supported");
        return;
      }

      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patientData = {
      ...prev,
      ...{ dateOfBirth, gender, phoneNumber, profileImage },
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/Patients/register`,
      patientData
    );
    
    if (response.status === 200) {
      setpatient(response.data.patient);
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/patient-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <Logo />
      </header>

      {/* Progress Steps */}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Complete Your Profile
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Let's set up your patient account to get started
          </p>

          <form onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-6">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    // onChange={(e) => {
                    //     const value = e.target.value;
                    //     setFullName(value);
                    //     setFieldStatus((prev) => ({ ...prev, fullName: !!value }));
                    //     updateCurrentStep();
                    // }}
                    value={fullName}
                    disabled
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
                      className="w-full px-3  py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  <label htmlFor="gender" className="block text-gray-700 mb-2">
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
                        Select gender
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
                      placeholder="(123) 456-7890"
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
            </div>

            {/* Profile Picture Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-6">Profile Picture</h2>
              {/* image Section */}
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden mb-4">
                  {profileImage ? (
                    <img
                      src={profileImage || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  )}
                </div>
                {/* Buttons */}
                <div className="flex space-x-4">
                  <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer transition duration-200 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Upload Photo
                    <input
                      type="file"
                      className="hidden"
                      accept="image/jpeg, image/png"
                      onChange={handleImageUpload}
                    />
                  </label>

                  {profileImage && (
                    <button
                      type="button"
                      className="text-gray-600 hover:text-gray-800 px-4 py-2 transition duration-200"
                      onClick={(e) => {
                        setProfileImage(null);
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Supported formats: JPG, PNG. Maximum file size: 5MB
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition duration-200"
              >
                Finish Setup
              </button>
            </div>
          </form>
        </div>

        {/* Support Information */}
        <div className="max-w-3xl mx-auto mt-8 text-center text-gray-600 text-sm">
          <p className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Need help? Contact our support team at{" "}
            <a
              href="mailto:support@careconnect.com"
              className="text-blue-500 hover:text-blue-700 ml-1"
            >
              support@careconnect.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
