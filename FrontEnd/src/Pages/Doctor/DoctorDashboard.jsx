
import { useState } from "react";
import {
  Calendar,
  Users,
  Clock,
  DollarSign,
  Settings,
  LogOut,
  FileText,
  Stethoscope,
  Bell,
  Home,
  ChevronRight,
  Menu,
  X,
  Eye,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  Activity,
  UserCheck,
} from "lucide-react";
import Logo from "../../Components/Logo";

const DoctorDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("queue");

  // Sample doctor data
  const doctorData = {
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    email: "dr.sarah@careconnect.com",
    phone: "+1 (555) 987-6543",
    clinic: "City Heart Hospital",
    experience: "12 years",
    rating: 4.9,
    profileImage: "/placeholder.svg?height=80&width=80",
  };

  // Today's stats
  const todayStats = {
    totalAppointments: 24,
    completedAppointments: 18,
    pendingAppointments: 6,
    revenue: 12000,
    avgWaitTime: "15 mins",
  };

  // Patient queue data
  const patientQueue = [
    {
      id: 1,
      tokenNumber: "A-19",
      patientName: "John Smith",
      age: 45,
      gender: "Male",
      appointmentTime: "10:30 AM",
      symptoms: "Chest pain, shortness of breath",
      status: "current",
      phone: "+1 (555) 123-4567",
      bloodGroup: "O+",
      allergies: ["Penicillin"],
    },
    {
      id: 2,
      tokenNumber: "A-20",
      patientName: "Emily Davis",
      age: 32,
      gender: "Female",
      appointmentTime: "10:45 AM",
      symptoms: "Regular checkup",
      status: "waiting",
      phone: "+1 (555) 234-5678",
      bloodGroup: "A+",
      allergies: [],
    },
    {
      id: 3,
      tokenNumber: "A-21",
      patientName: "Michael Brown",
      age: 58,
      gender: "Male",
      appointmentTime: "11:00 AM",
      symptoms: "High blood pressure follow-up",
      status: "waiting",
      phone: "+1 (555) 345-6789",
      bloodGroup: "B+",
      allergies: ["Aspirin"],
    },
    {
      id: 4,
      tokenNumber: "A-22",
      patientName: "Lisa Wilson",
      age: 28,
      gender: "Female",
      appointmentTime: "11:15 AM",
      symptoms: "Heart palpitations",
      status: "waiting",
      phone: "+1 (555) 456-7890",
      bloodGroup: "AB+",
      allergies: [],
    },
  ];

  // Today's appointments
  const todayAppointments = [
    {
      id: 1,
      time: "09:00 AM",
      patient: "Robert Johnson",
      type: "Consultation",
      status: "completed",
      duration: "30 mins",
      fee: 500,
    },
    {
      id: 2,
      time: "09:30 AM",
      patient: "Maria Garcia",
      type: "Follow-up",
      status: "completed",
      duration: "20 mins",
      fee: 300,
    },
    {
      id: 3,
      time: "10:00 AM",
      patient: "David Lee",
      type: "Consultation",
      status: "completed",
      duration: "25 mins",
      fee: 500,
    },
    {
      id: 4,
      time: "10:30 AM",
      patient: "John Smith",
      type: "Consultation",
      status: "in-progress",
      duration: "30 mins",
      fee: 500,
    },
    {
      id: 5,
      time: "10:45 AM",
      patient: "Emily Davis",
      type: "Checkup",
      status: "scheduled",
      duration: "15 mins",
      fee: 400,
    },
  ];

  // Recent patients
  const recentPatients = [
    {
      id: 1,
      name: "Alice Cooper",
      lastVisit: "2024-01-10",
      condition: "Hypertension",
      nextAppointment: "2024-01-25",
    },
    {
      id: 2,
      name: "Bob Wilson",
      lastVisit: "2024-01-08",
      condition: "Diabetes",
      nextAppointment: "2024-01-22",
    },
    {
      id: 3,
      name: "Carol Brown",
      lastVisit: "2024-01-05",
      condition: "Heart Disease",
      nextAppointment: "2024-01-20",
    },
  ];

  // Navigation function
  const handleNavigation = (route) => {
    console.log(`Navigating to: ${route}`);
    setSidebarOpen(false);
    alert(`Navigation to ${route} - Replace with actual routing`);
  };

  // Patient details modal
  const PatientDetailsModal = ({ patient, onClose }) => {
    if (!patient) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Patient Details
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
          </div>
          <div className="p-4 sm:p-6 space-y-6">
            {/* Patient Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Patient Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{patient.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age:</span>
                    <span className="font-medium">{patient.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gender:</span>
                    <span className="font-medium">{patient.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Blood Group:</span>
                    <span className="font-medium">{patient.bloodGroup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{patient.phone}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Appointment Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Token:</span>
                    <span className="font-medium text-blue-600">
                      {patient.tokenNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">
                      {patient.appointmentTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`font-medium capitalize ${
                        patient.status === "current"
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Symptoms/Chief Complaint
              </h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                {patient.symptoms}
              </p>
            </div>

            {/* Allergies */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Allergies</h3>
              <div className="flex flex-wrap gap-2">
                {patient.allergies.length > 0 ? (
                  patient.allergies.map((allergy, index) => (
                    <span
                      key={index}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                    >
                      {allergy}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">
                    No known allergies
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                Start Consultation
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                View History
              </button>
              <button className="px-4 py-3 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                Reschedule
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md border"
      >
        <Menu className="h-6 w-6 text-gray-600" />
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Responsive Sidebar */}
        <div
          className={`
            w-64 bg-white shadow-lg border-r h-screen fixed lg:static z-50
            transform transition-transform duration-300 ease-in-out
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          {/* Mobile Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-6 border-b">
            <div className="flex items-center mb-4">
              <Logo />
            </div>
          </div>

          {/* Doctor Profile Section */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <img
                src={doctorData.profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
              />
              <div>
                <p className="font-semibold text-gray-900">{doctorData.name}</p>
                <p className="text-sm text-gray-600">
                  {doctorData.specialization}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <div className="flex items-center space-x-3 px-4 py-3 bg-blue-600 text-white rounded-lg">
                  <Home className="h-5 w-5" />
                  <span className="font-medium">Dashboard</span>
                </div>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("patient-queue")}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5" />
                    <span className="font-medium">Patient Queue</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("appointments")}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">Appointments</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("patient-records")}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5" />
                    <span className="font-medium">Patient Records</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("schedule")}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">Schedule</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("settings")}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5" />
                    <span className="font-medium">Settings</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </li>
            </ul>
          </nav>

          {/* Logout */}
          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={() => handleNavigation("logout")}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content - Responsive */}
        <div className="flex-1 lg:ml-0 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
          <div className="space-y-4 sm:space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-4 sm:p-6 text-white">
              <h1 className="text-xl sm:text-2xl font-bold mb-2">
                Good Morning, {doctorData.name}!
              </h1>
              <p className="text-blue-100 text-sm sm:text-base">
                Ready to help your patients today
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Today</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                      {todayStats.totalAppointments}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-600">
                      {todayStats.completedAppointments}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-xl sm:text-2xl font-bold text-orange-600">
                      {todayStats.pendingAppointments}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Revenue</p>
                    <p className="text-xl sm:text-2xl font-bold text-purple-600">
                      ₹{todayStats.revenue.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Wait</p>
                    <p className="text-xl sm:text-2xl font-bold text-indigo-600">
                      {todayStats.avgWaitTime}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
            </div>

            {/* Patient Queue Section */}
            <div className="bg-white rounded-2xl shadow-sm border">
              <div className="p-4 sm:p-6 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mr-2" />
                    Patient Queue
                  </h2>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium self-start sm:self-auto">
                    {patientQueue.length} Waiting
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  {patientQueue.map((patient) => (
                    <div
                      key={patient.id}
                      className={`border rounded-lg p-4 transition-colors ${
                        patient.status === "current"
                          ? "bg-green-50 border-green-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-3">
                            <div
                              className={`p-2 rounded-lg ${
                                patient.status === "current"
                                  ? "bg-green-100"
                                  : "bg-blue-100"
                              }`}
                            >
                              <UserCheck
                                className={`h-5 w-5 ${
                                  patient.status === "current"
                                    ? "text-green-600"
                                    : "text-blue-600"
                                }`}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {patient.patientName}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {patient.age} years • {patient.gender}
                              </p>
                            </div>
                            {patient.status === "current" && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Token</p>
                              <p className="font-medium text-blue-600">
                                {patient.tokenNumber}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Time</p>
                              <p className="font-medium">
                                {patient.appointmentTime}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Blood Group</p>
                              <p className="font-medium">
                                {patient.bloodGroup}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Symptoms</p>
                              <p className="font-medium text-gray-700 truncate">
                                {patient.symptoms}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => setSelectedPatient(patient)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </button>
                          {patient.status === "current" && (
                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                              Complete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Today's Schedule & Recent Patients */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Today's Schedule */}
              <div className="bg-white rounded-2xl shadow-sm border">
                <div className="p-4 sm:p-6 border-b">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mr-2" />
                    Today's Schedule
                  </h2>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="space-y-3">
                    {todayAppointments.slice(0, 5).map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.time}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {appointment.patient}
                            </p>
                            <p className="text-sm text-gray-600">
                              {appointment.type}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              appointment.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : appointment.status === "in-progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            {appointment.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            ₹{appointment.fee}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Patients */}
              <div className="bg-white rounded-2xl shadow-sm border">
                <div className="p-4 sm:p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                      <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 mr-2" />
                      Recent Patients
                    </h2>
                    <button
                      onClick={() => handleNavigation("patient-records")}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                    >
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="space-y-4">
                    {recentPatients.map((patient) => (
                      <div
                        key={patient.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {patient.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {patient.condition}
                          </p>
                          <p className="text-xs text-gray-500">
                            Last visit:{" "}
                            {new Date(patient.lastVisit).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            Next Visit
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(
                              patient.nextAppointment
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Details Modal */}
      <PatientDetailsModal
        patient={selectedPatient}
        onClose={() => setSelectedPatient(null)}
      />
    </div>
  );
};

export default DoctorDashboard;
