import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Components/Logo";
import axios from "axios";
import Avatar from "../../Components/Avatar";
import { PatientDataContext } from "../../Context/PatientContext";
import {
  Bell,
  Calendar,
  Dock,
  DockIcon,
  File,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  MessageCircleCodeIcon,
  MessageCircleDashed,
  MessageSquare,
  Paperclip,
  Search,
  Settings,
  User,
} from "lucide-react";

const PatientDashboard = () => {
  const { patient, setpatient } = useContext(PatientDataContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Mock data for the dashboard
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "Today, 2:00 PM",
      Status: "Pending",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "Tomorrow, 10:30 AM",
      Status: "Accepted",
      image: "/placeholder.svg",
    },
  ];

  const recommendedDoctors = [
    {
      id: 1,
      name: "Dr. Emily Wilson",
      specialty: "Pediatrician",
      rating: 5,
      nextAvailable: "Tomorrow, 9:00 AM",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Dr. James Anderson",
      specialty: "Orthopedist",
      rating: 4,
      nextAvailable: "Today, 4:30 PM",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Dr. Maria Garcia",
      specialty: "Neurologist",
      rating: 5,
      nextAvailable: "Friday, 11:00 AM",
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:translate-x-0 md:sticky top-0 md:top-0 left-0 w-64 bg-white shadow-md z-30 h-full transition-transform duration-300 ease-in-out overflow-y-auto`}
      >
        <div className="p-4 border-b">
          <Logo />
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/patient-dashboard"
                className="flex items-center p-3 text-blue-600 bg-blue-100 rounded-md font-medium"
              >
                <Home color="#3b82f6" size={20} className="mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/book-appointment"
                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Dock color="#6b7280" size={20} className="mr-3" />
                Appointments
              </Link>
            </li>
            <li>
              <Link
                to="/find-doctors"
                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <User color="#6b7280" size={20} className="mr-3" />
                Find Doctors
              </Link>
            </li>
            <li>
              <Link
                to="/patient-profile"
                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Settings color="#6b7280" size={20} className="mr-3" />
                Settings
              </Link>
            </li>
            {/* <li>
              <Link
                to="/help"
                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Help Center
              </Link>
            </li> */}
            <li>
              <Link
                to="/logout"
                className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <LogOut color="#6b7280" size={20} className="mr-3" />
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <header className="hidden md:block md:bg-white shadow-sm sticky top-0 z-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Left side - Menu button and search on mobile */}
              <div className="flex items-center">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="md:hidden p-2 rounded-md text-gray-700 focus:outline-none"
                >
                  <Menu color="black" size={27} />
                </button>
              </div>

              {/* Right side - Actions */}
              <div className="flex items-center space-x-3">
                {/* AI Consult Button - Always visible */}
                <Link
                  to="/ai-chatbot"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm"
                >
                  Consult AI
                </Link>

                {/* Notifications */}
                <Link to="/patient-notifications" className="relative p-1">
                  <Bell color="black" size={27} />
                  <span className="  h-2 w-2 bg-red-500 rounded-full"></span>
                </Link>

                {/* User Avatar */}
                <Avatar />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                Welcome, {patient.fullname}
              </h1>
              {/* <p className="text-gray-600">Wednesday, February 19, 2025</p> */}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <Calendar color="#3b82f6" size={24} />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">Upcoming Appointments</h3>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>

            {/* New Notifications */}
            <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <MessageSquare color="#3b82f6" size={24} />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">New Notifications</h3>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>

            {/* Prescriptions */}
            <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <File color="#3b82f6" size={24} />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">Prescriptions</h3>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </div>

          {/* Upcoming Appointments Section */}
          <div className="mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
              Upcoming Appointments
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-lg shadow-sm p-4"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={appointment.image || "/placeholder.svg"}
                      alt={appointment.doctor}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {appointment.doctor}
                      </h3>
                      <p className="text-gray-600">{appointment.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {appointment.date}
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <span className="text-green-500">{appointment.Status}</span>
                  </div>
                  <div className="text-right">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Find a Doctor Section */}
          {/* <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
              Find a Doctor
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center"
                >
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-gray-800 text-center">
                    {doctor.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{doctor.specialty}</p>
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          i < doctor.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    <p className="text-center">Next Available</p>
                    <p className="font-medium text-center">
                      {doctor.nextAvailable}
                    </p>
                  </div>
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
          </div> */}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Fixed Consult AI button for mobile */}
      <div className="md:hidden fixed bottom-4 right-4 z-20">
        <Link
          to="/ai-chatbot"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center"
        >
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
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Consult AI
        </Link>
      </div>
    </div>
  );
};

export default PatientDashboard;
