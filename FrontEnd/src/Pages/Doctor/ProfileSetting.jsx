import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";
import DoctorHeader from "../../Components/DoctorHeader";
import { useContext } from "react";
import { DoctorDataContext } from "../../Context/DoctorContext";
import defaultProfile from "/Images/DefaultProfile.jpeg";
import axios from "axios";

const DoctorProfile = () => {
  const [isEditing, setIsEditing] = useState({
    personal: false,
    professional: false,
  });

  const { doctor, setDoctor } = useContext(DoctorDataContext);
  const toggleEditing = (section) => {
    setIsEditing({
      ...isEditing,
      [section]: !isEditing[section],
    });
  };

  const [fullname, setFullName] = useState(doctor.fullname);
  const [email, setEmail] = useState(doctor.email);
  const [phoneNumber, setPhoneNumber] = useState(doctor.basicInfo.phoneNumber);

  // Professional Details
  const [checkupFee, setCheckupFee] = useState(
    doctor.professionalDetails.checkupfee
  );
  const [specialty, setSpeciality] = useState(
    doctor.professionalDetails.specialty
  );
  const [licenseNumber, setLicenseNumber] = useState(
    doctor.professionalDetails.licenseNumber
  );

  //Clinic Detaisl
  const [location, setLocation] = useState(doctor.clinicInfo.clinicAddress);
  const [clinicName, setClinicName] = useState(doctor.clinicInfo.clinicName);
  const [consultationHours, setConsultationHours] = useState(
    doctor.clinicInfo.consultationHours
  );

  const [profileImage, setprofileImage] = useState(doctor.profileImage);
  const [prevProfile, setPrevProfile] = useState();
  const [upload, setUpload] = useState(false);

  const handleSaveChanges = async () => {
    const updatedData = {
      id: doctor._id,
      fullname,
      email,
      profileImage,
      basicInfo: {
        phoneNumber,
      },
      clinicInfo: {
        clinicAddress: location,
        clinicName,
        consultationHours,
      },
      professionalDetails: {
        checkupfee: checkupFee,
        licenseNumber,
        specialty,
      },
    };
    toast.promise(
      axios
        .post(`${import.meta.env.VITE_BASE_URL}/doctors/update`, updatedData)
        .then((response) => {
          if (response.status == 200) {
            setDoctor(response.data.doctor);
            setIsEditing({
              personal: false,
              professional: false,
              clinic: false,
            });
            setUpload(!upload);
          }
        }),
      {
        pending: "Updating details...",
        error: "Failed to update details",
        success: "Updated Sucessfully",
      }
    );
  };

  const handleCancel = () => {
    setprofileImage((prev) => ({ ...prev }));
    setIsEditing({
      personal: false,
      professional: false,
      clinic: false,
    });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Care_Connect");
    formData.append("cloud_name", "di9ljccil");
    console.log("Uploading image...");
    toast.promise(
      fetch("https://api.cloudinary.com/v1_1/di9ljccil/image/upload", {
        method: "POST",
        body: formData,
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error("Upload Upload failed");
        }
        const uploadedImage = await res.json();
        setPrevProfile(profileImage);
        setprofileImage(uploadedImage.url);
        setUpload(!upload);
        console.log("Upload complete ✅");
      }),
      {
        pending: "Uploading Profile Picture...",
        success: "Profile updated successfully!",
        error: "Failed to update profile.",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DoctorHeader />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar - Doctor Info  */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src={profileImage || defaultProfile}
                  alt=""
                  className="w-32 h-32 rounded-full object-cover"
                />
                <label
                  htmlFor="profilePictureUpload"
                  className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                </label>
                <input
                  type="file"
                  id="profilePictureUpload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUpload}
                />
              </div>
              {upload && (
                <div className="mt-2 flex gap-2">
                  <button
                    className=" rounded  p-1.5 px-3 text-black bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setprofileImage(prevProfile);
                      setUpload(!upload);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                Dr. {fullname}
              </h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-4">
                Doctor
              </span>
              <div className="w-full space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-gray-400"
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
                  <span>{email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-gray-400"
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
                  <span>{phoneNumber}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-gray-400"
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
                  <span>{location}</span>
                </div>
              </div>
              {/* <div className="grid grid-cols-3 gap-4 w-full">
                                <div className="bg-blue-50 p-3 rounded-lg text-center">
                                    <div className="flex items-center justify-center mb-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-blue-500 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        <span className="text-blue-700 font-bold">{doctorData.stats.patients}</span>
                                    </div>
                                    <span className="text-xs text-gray-600">Patients</span>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg text-center">
                                    <div className="flex items-center justify-center mb-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-blue-500 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span className="text-blue-700 font-bold">{doctorData.stats.years}</span>
                                    </div>
                                    <span className="text-xs text-gray-600">Years</span>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg text-center">
                                    <div className="flex items-center justify-center mb-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-blue-500 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                        <span className="text-blue-700 font-bold">{doctorData.stats.rating}</span>
                                    </div>
                                    <span className="text-xs text-gray-600">Rating</span>
                                </div>
                            </div> */}
            </div>
          </div>
          <div className="w-full md:w-3/4">
            {/* Personal Information Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Personal Information
                </h2>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => toggleEditing("personal")}
                >
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border ${
                      isEditing.personal
                        ? "border-blue-300"
                        : "border-gray-200 bg-gray-50"
                    } rounded-md ${
                      isEditing.personal
                        ? "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        : ""
                    }`}
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    readOnly={!isEditing.personal}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`w-full px-3 py-2 border ${
                      isEditing.personal
                        ? "border-blue-300"
                        : "border-gray-200 bg-gray-50"
                    } rounded-md ${
                      isEditing.personal
                        ? "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        : ""
                    }`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={!isEditing.personal}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className={`w-full px-3 py-2 border ${
                      isEditing.personal
                        ? "border-blue-300"
                        : "border-gray-200 bg-gray-50"
                    } rounded-md ${
                      isEditing.personal
                        ? "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        : ""
                    }`}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    readOnly={!isEditing.personal}
                  />
                </div>
              </div>
            </div>
            {/* Professional Information Section */}

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Professional Details
                </h2>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => toggleEditing("professional")}
                >
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialty
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border ${
                      isEditing.professional
                        ? "border-blue-300"
                        : "border-gray-200 bg-gray-50"
                    } rounded-md ${
                      isEditing.professional
                        ? "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        : ""
                    }`}
                    value={specialty}
                    onChange={(e) => setSpeciality(e.target.value)}
                    readOnly={!isEditing.professional}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CheckUp Fee
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border ${
                      isEditing.professional
                        ? "border-blue-300"
                        : "border-gray-200 bg-gray-50"
                    } rounded-md ${
                      isEditing.professional
                        ? "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        : ""
                    }`}
                    value={checkupFee}
                    onChange={(e) => setCheckupFee(e.target.value)}
                    readOnly={!isEditing.professional}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    License Number
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border ${
                      isEditing.professional
                        ? "border-blue-300"
                        : "border-gray-200 bg-gray-50"
                    } rounded-md ${
                      isEditing.professional
                        ? "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        : ""
                    }`}
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    readOnly={!isEditing.professional}
                  />
                </div>
              </div>
            </div>

            {/* Clinic Information Section */}

            <div className="bg-white flex flex-col rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Clinic Details
                </h2>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => toggleEditing("clinic")}
                >
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Clinic Name
                  </label>
                  <input
                    type="text"
                    name="ClinicName"
                    className={`w-full mb-2 p-1 border ${
                      isEditing.clinic
                        ? "border-blue-300"
                        : "border-gray-200 bg-gray-50"
                    } rounded-md flex-grow`}
                    disabled={!isEditing.clinic}
                    value={clinicName}
                    onChange={(e) => {
                      setClinicName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Clinic Location
                  </label>
                  <input
                    type="text"
                    name="ClinicLocation"
                    className={`w-full mb-2 p-1 border ${
                      isEditing.clinic
                        ? "border-blue-300"
                        : "border-gray-200 bg-gray-50"
                    } rounded-md flex-grow`}
                    disabled={!isEditing.clinic}
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Timing
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(consultationHours).map(
                      ([day, time], index) => (
                        <div
                          key={index}
                          className="flex flex-wrap items-center"
                        >
                          <div className="w-1/3">
                            <span className="font-medium">{day}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              className={`p-1 border ${
                                isEditing.clinic
                                  ? "border-blue-300"
                                  : "border-gray-200 bg-gray-50"
                              } rounded-md flex-grow`}
                              disabled={!isEditing.clinic}
                              value={time.StartTime}
                              onChange={(e) => {
                                setConsultationHours((prev) => ({
                                  ...prev,
                                  [day]: {
                                    ...prev[day],
                                    StartTime: e.target.value,
                                  },
                                }));
                              }}
                            />
                            <input
                              type="time"
                              className={`p-1 border ${
                                isEditing.clinic
                                  ? "border-blue-300"
                                  : "border-gray-200 bg-gray-50"
                              } rounded-md flex-grow`}
                              disabled={!isEditing.clinic}
                              value={time.EndTime}
                              onChange={(e) => {
                                setConsultationHours((prev) => ({
                                  ...prev,
                                  [day]: {
                                    ...prev[day],
                                    EndTime: e.target.value,
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment History */}

            {/* <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Appointment History
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {doctorData.appointmentHistory.map((appointment, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {appointment.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {appointment.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {appointment.patient}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              appointment.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : appointment.status === "Cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div> */}
          </div>
        </div>

        {/* Action Buttons */}
        {(upload ||
          isEditing.personal ||
          isEditing.professional ||
          isEditing.clinic) && (
          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
