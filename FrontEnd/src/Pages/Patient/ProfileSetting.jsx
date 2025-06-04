import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Components/Logo";
import Avatar from "../../Components/Avatar";
import axios from "axios";
import defaultProfile from "/Images/DefaultProfile.jpeg";
import { PatientDataContext } from "../../Context/PatientContext";
import PatientHeader from "../../Components/PatientHeader";

const PatientProfile = () => {
  const { patient, setpatient } = useContext(PatientDataContext);
  console.log(patient);

  const [isEditing, setIsEditing] = useState(false);
  const [fullname, setFullname] = useState(patient.fullname);
  const [email, setEmail] = useState(patient.email);
  const [phoneNumber, setPhoneNumber] = useState(patient.phoneNumber);
  const [upload, setUpload] = useState(false);
  const [profileImage, setprofileImage] = useState(
    patient.profileImage || defaultProfile
  );
  const [prevProfile, setPrevProfile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      id: patient._id,
      fullname,
      email,
      phoneNumber,
      profileImage,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/patients/update`,
      updatedData
    );
    setpatient(response.data.Patient);
    setIsEditing(false);
    setUpload(false);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Care_Connect");
    formData.append("cloud_name", "di9ljccil");
    toast.promise(
      fetch("https://api.cloudinary.com/v1_1/di9ljccil/image/upload", {
        method: "POST",
        body: formData,
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error("Upload failed");
        }
        const uploadedImage = await res.json();
        setPrevProfile(profileImage);
        setprofileImage(uploadedImage.url);
        console.log(uploadedImage.url);
        setUpload((prev) => !prev);
        return uploadedImage; // ✅ Important for toast.promise to resolve correctly
      }),
      {
        pending: "Uploading profile picture...",
        success: "Profile picture updated!",
        error: "Upload failed. Try again.",
      }
    );
  };

  // Mock data for upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      doctor: {
        name: "Dr. Sarah Wilson",
        specialty: "Cardiologist",
        image: "/placeholder.svg",
      },
      date: "December 15, 2023",
      time: "10:30 AM",
    },
    {
      id: 2,
      doctor: {
        name: "Dr. Michael Chen",
        specialty: "Neurologist",
        image: "/placeholder.svg",
      },
      date: "December 20, 2023",
      time: "2:15 PM",
    },
  ];

  // Mock data for past appointments
  const pastAppointments = [
    {
      id: 3,
      doctor: {
        name: "Dr. Emily Brown",
        specialty: "General Physician",
        image: "/placeholder.svg",
      },
      date: "November 30, 2023",
      time: "9:00 AM",
      status: "Completed",
    },
    {
      id: 4,
      doctor: {
        name: "Dr. James Miller",
        specialty: "Dermatologist",
        image: "/placeholder.svg",
      },
      date: "November 15, 2023",
      time: "3:45 PM",
      status: "Cancelled",
    },
    {
      id: 5,
      doctor: {
        name: "Dr. Lisa Wang",
        specialty: "Ophthalmologist",
        image: "/placeholder.svg",
      },
      date: "November 1, 2023",
      time: "11:30 AM",
      status: "Completed",
    },
  ];

  const handleCancelAppointment = (appointmentId) => {
    // In a real app, this would call an API to cancel the appointment
    console.log(`Cancelling appointment ${appointmentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <PatientHeader />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 h-[88vh]">
        <div className="flex flex-col md:flex-row gap-8 ">
          {/* Left Column - Profile Information */}
          <div className="w-full md:w-1/3 h-[88vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit Profile</h2>
              <button
                className={`text-blue-600 hover:text-blue-800 rounded-full ${
                  isEditing ? "bg-gray-200" : ""
                } transition-colors duration-200 p-1`}
                onClick={() => setIsEditing(!isEditing)}
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
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>
            {/* Profile Card  */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col items-center mb-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label
                    htmlFor="profilePicture"
                    className={`${
                      !isEditing ? "hidden" : ""
                    } absolute bottom-0 right-0 bg-blue-600 rounded-full p-1.5 text-white cursor-pointer`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </label>
                  <input
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={!isEditing}
                    onChange={handleUpload}
                  />
                </div>
                {upload && (
                  <div className="mt-2 flex gap-2">
                    <button
                      className=" rounded  p-1.5 px-3 text-black bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setprofileImage(prevProfile);
                        setIsEditing(!isEditing);
                        setUpload(!upload);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
                <h2 className="text-xl font-semibold mt-4">
                  {patient.fullName}
                </h2>
                <p className="text-gray-500 text-sm text-center">
                  patient ID: {patient._id}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 mr-3"
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

                  <span className="text-gray-700 text-wrap">
                    {patient.email}
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 mr-3"
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
                  <span className="text-gray-700">0{patient.phoneNumber}</span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 mr-3"
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
                  <span className="text-gray-700">{patient.gender}</span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 mr-3"
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
                  <span className="text-gray-700">
                    Born {patient.dateOfBirth}
                  </span>
                </div>
              </div>
            </div>
            <h2 className="text-lg font-semibold">Personal Details</h2>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={fullname}
                    onChange={(e) => {
                      setFullname(e.target.value);
                    }}
                    disabled={!isEditing}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    disabled={!isEditing}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={patient.phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                    disabled={!isEditing}
                  />
                </div>

                {isEditing && (
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
                  >
                    Save Changes
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Right Column - Appointments */}
          <div className="w-full md:w-2/3 h-[88vh] overflow-auto">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Upcoming Appointments
              </h2>

              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <img
                          src={appointment.doctor.image || "/placeholder.svg"}
                          alt={appointment.doctor.name}
                          className="w-12 h-12 rounded-full mr-4 object-cover"
                        />
                        <div>
                          <h3 className="font-medium">
                            {appointment.doctor.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {appointment.doctor.specialty}
                          </p>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
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
                            {appointment.date}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-3 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {appointment.time}
                          </div>
                        </div>
                      </div>
                      <button
                        className="text-red-500 hover:text-red-700 text-sm flex items-center"
                        onClick={() => handleCancelAppointment(appointment.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Appointments */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>

              <div className="space-y-4">
                {pastAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <img
                          src={appointment.doctor.image || "/placeholder.svg"}
                          alt={appointment.doctor.name}
                          className="w-12 h-12 rounded-full mr-4 object-cover"
                        />
                        <div>
                          <h3 className="font-medium">
                            {appointment.doctor.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {appointment.doctor.specialty}
                          </p>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
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
                            {appointment.date}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-3 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {appointment.time}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          appointment.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
