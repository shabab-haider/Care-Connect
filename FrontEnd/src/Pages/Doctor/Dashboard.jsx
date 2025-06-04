import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Components/Logo";
import Avatar from "../../Components/Avatar";
import { Bell, Cross, LogOut, Menu, Settings } from "lucide-react";

const DoctorDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  // Mock data for the dashboard
  const pendingRequests = [
    {
      id: 1,
      name: "John Smith",
      time: "Today, 3:00 PM",
      type: "Video Consultation",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      time: "Tomorrow, 10:30 AM",
      type: "In-Person Visit",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Michael Brown",
      time: "Today, 5:15 PM",
      type: "Video Consultation",
      image: "/placeholder.svg",
    },
  ];

  const todaySchedule = [
    {
      id: 1,
      time: "09:00 AM",
      name: "Emma Wilson",
      type: "General Checkup",
      status: "Completed",
    },
    {
      id: 2,
      time: "11:30 AM",
      name: "Robert Garcia",
      type: "Follow-up",
      status: "Completed",
    },
    {
      id: 3,
      time: "02:00 PM",
      name: "David Miller",
      type: "General Checkup",
      status: "In Progress",
    },
    {
      id: 4,
      time: "03:30 PM",
      name: "John Smith",
      type: "Video Consultation",
      status: "Upcoming",
    },
    {
      id: 5,
      time: "05:15 PM",
      name: "Michael Brown",
      type: "Video Consultation",
      status: "Upcoming",
    },
  ];

  const recentPatients = [
    {
      id: 1,
      name: "Emma Wilson",
      lastVisit: "Today",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Robert Garcia",
      lastVisit: "Today",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Lisa Anderson",
      lastVisit: "Yesterday",
      image: "/placeholder.svg",
    },
    {
      id: 4,
      name: "James Taylor",
      lastVisit: "3 days ago",
      image: "/placeholder.svg",
    },
  ];

  const handleAccept = (id) => {
    console.log("Accepted request", id);
  };

  const handleDecline = (id) => {
    console.log("Declined request", id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div>
              <Logo />
            </div>

            {screenSize > 767 ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/logout"
                  className="bg-red-600 p-2 font-semibold rounded text-white"
                >
                  Logout
                </Link>
                <Link to="/doctor-notifications" className="relative">
                  <Bell color="black" size={27} />
                  <span className="absolute bottom-3 left-3 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    3
                  </span>
                </Link>
                <div className="pb-1">
                  <Link to="/doctor-profile">
                  <Avatar />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-700"
                >
                  {mobileMenuOpen ? (
                    <div className="text-3xl font-semibold mb-3 mr-2">x</div>
                  ) : (
                    <Menu color="black" size={27} />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Links */}
          {mobileMenuOpen && (
            <div className="w-[50vw] absolute top-12 right-0 flex flex-col gap-3 md:hidden mt-2 p-4 bg-white shadow-md rounded z-10">
              <Link
                to="/doctor-notifications"
                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Bell color="#6b7280" size={20} className="mr-3" />
                Notifications
              </Link>
              <Link
                to="/patient-profile"
                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Settings color="#6b7280" size={20} className="mr-3" />
                Settings
              </Link>
              <Link
                to="/logout"
                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <LogOut color="#6b7280" size={20} className="mr-3" />
                Logout
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Left Sidebar - Stats */}
          <div className="w-full lg:w-1/4 px-4 mb-8 lg:mb-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 mb-6">
              {/* Today's Appointments */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
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
                </div>
                <h3 className="text-3xl font-bold text-gray-800">8</h3>
                <p className="text-gray-600 text-sm">Today's Appointments</p>
              </div>

              {/* Pending Requests */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
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
                </div>
                <h3 className="text-3xl font-bold text-gray-800">3</h3>
                <p className="text-gray-600 text-sm">Pending Requests</p>
              </div>

              {/* Total Patients */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
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
                </div>
                <h3 className="text-3xl font-bold text-gray-800">142</h3>
                <p className="text-gray-600 text-sm">Total Patients</p>
              </div>

              {/* Week's Consultations */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-800">32</h3>
                <p className="text-gray-600 text-sm">Week's Consultations</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="hidden md:bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Actions
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/schedule"
                    className="flex items-center text-gray-700 hover:text-blue-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
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
                    View Schedule
                  </Link>
                </li>
                <li>
                  <Link
                    to="/doctor-profile"
                    className="flex items-center text-gray-700 hover:text-blue-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Middle Section - Appointments */}
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
            {/* Pending Appointment Requests */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Pending Appointment Requests
              </h3>
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4"
                  >
                    <div className="flex items-center mb-3 sm:mb-0">
                      <img
                        src={request.image || "/placeholder.svg"}
                        alt={request.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {request.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {request.time} • {request.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAccept(request.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(request.id)}
                        className="text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Today's Schedule
              </h3>
              <div className="space-y-6">
                {todaySchedule.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex flex-col sm:flex-row"
                  >
                    <div className="w-full sm:w-24 text-gray-600 mb-2 sm:mb-0">
                      {appointment.time}
                    </div>
                    <div className="flex-1 border-l-0 sm:border-l-2 border-gray-200 pl-0 sm:pl-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div className="mb-2 sm:mb-0">
                          <h4 className="font-medium text-gray-800">
                            {appointment.name}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {appointment.type}
                          </p>
                        </div>
                        <div>
                          {appointment.status === "Completed" && (
                            <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                              Completed
                            </span>
                          )}
                          {appointment.status === "In Progress" && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                              In Progress
                            </span>
                          )}
                          {appointment.status === "Upcoming" && (
                            <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                              Upcoming
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Recent Patients & Next Appointment */}
          <div className="w-full lg:w-1/4 px-4">
            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Recent Patients */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Patients
              </h3>
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center">
                    <img
                      src={patient.image || "/placeholder.svg"}
                      alt={patient.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {patient.name}
                      </h4>
                      <p className="text-gray-600 text-xs">
                        Last visit: {patient.lastVisit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Appointment */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Next Appointment
              </h3>
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-500"
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
                </div>
              </div>
              <div className="text-center mb-4">
                <h4 className="font-medium text-gray-800">David Miller</h4>
                <p className="text-gray-600 text-sm">General Checkup</p>
              </div>
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-blue-500">02:00 PM</h3>
              </div>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
