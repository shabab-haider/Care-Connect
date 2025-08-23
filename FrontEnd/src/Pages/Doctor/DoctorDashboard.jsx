import { useContext, useEffect, useState } from "react";
import {
  Calendar,
  Users,
  Settings,
  LogOut,
  Home,
  ChevronRight,
  Menu,
  X,
  Eye,
  CheckCircle,
  Plus,
  AlertCircle,
  UserX,
  XCircle,
  PlusSquare,
  Dot,
  History,
  ChevronLast,
  Clock,
} from "lucide-react";
import Logo from "../../Components/Logo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DoctorDataContext } from "../../Context/DoctorContext";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { doctor, setDoctor } = useContext(DoctorDataContext);
  const doctorId = doctor._id;
  const todayDateString = new Date().toISOString().split("T")[0];
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [offlinePatientForm, setOfflinePatientForm] = useState({
    name: "",
    phone: "",
    gender: "",
  });
  const [disableAddWalkinPatient, setDisableAddWalkinPatient] = useState(false);
  const [updatePatientQueue, setUpdatePatientQueue] = useState(0);
  const [updateMissedAppointments, setUpdateMissedAppointments] = useState(0);

  const token = localStorage.getItem("token");

  // Sample doctor data
  const doctorData = {
    name: doctor.fullName,
    specialization: doctor.professionalDetails.specialization,
    profileImage: doctor.profileImage,
  };

  const [appointmentRequests, setAppointmentRequests] = useState([]);

  const [patientQueue, setPatientQueue] = useState([]);
  const [missedAppointments, setMissedAppointments] = useState([]);

  //get patientQueue
  useEffect(() => {
    const getPatientQueue = async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/appointments/booked/${todayDateString}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == "200") {
        console.log(response.data.appointments);
        setPatientQueue(
          response.data.appointments.sort(
            (a, b) => a.appointmentNo - b.appointmentNo
          )
        );
      }
    };
    getPatientQueue();
  }, [updatePatientQueue]);

  //get missedAppointments
  useEffect(() => {
    const getMissedAppointments = async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/appointments/missed/${todayDateString}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMissedAppointments(response.data.appointments);
    };
    getMissedAppointments();
  }, [updateMissedAppointments]);

  // Today's stats
  const todayStats = {
    totalAppointments: patientQueue.length + missedAppointments.length,
    remaining:patientQueue.length,
    Missed: missedAppointments.length,
  };

  //get Pending Appointments-> use thier length to display notification dot in request nav
  useEffect(() => {
    const getPendingAppointments = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/appointments/pending`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == "200") {
        setAppointmentRequests(response.data.appointments);
      }
    };
    getPendingAppointments();
  }, []);

  // Navigation function
  const handleNavigation = (route) => {
    console.log(`Navigating to: ${route}`);
    setSidebarOpen(false);
    alert(`Navigation to ${route} - Replace with actual routing`);
  };

  // Move patient to missed appointments
  const handleMarkAsNoShow = async (id) => {
    console.log(id);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/appointments/NoShow/${id}`
    );
    if (response.status == "200") {
      setUpdateMissedAppointments(updateMissedAppointments + 1);
      setUpdatePatientQueue(updatePatientQueue + 1);
    }
  };

  // Move patient back to queue from missed appointments
  const handleMoveBackToQueue = async (id) => {
    console.log(id);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/appointments/moveToQueue`,
      { id }
    );
    if (response.status == "200") {
      setUpdateMissedAppointments(updateMissedAppointments + 1);
      setUpdatePatientQueue(updatePatientQueue + 1);
    }
  };

  const handleOfflinePatientInputChange = (field, value) => {
    setOfflinePatientForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddOfflinePatient = async (e) => {
    e.preventDefault();
    const data = {
      name: offlinePatientForm.name,
      phone: offlinePatientForm.phone,
      gender: offlinePatientForm.gender,
    };
    console.log(data);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/appointments/addOfflinePatient/${
        data.name
      }/${data.phone}/${data.gender}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if ((response.status = "201")) {
      setShowAddPatientModal(false);
      setUpdatePatientQueue(updatePatientQueue + 1);
    }
  };

  // Patient details modal
  const PatientDetailsModal = ({ patient, onClose }) => {
    if (!patient) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200">
          <div className="p-5 border-b flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Patient Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="p-5 space-y-6">
            {/* Patient Info */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Patient Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Name:</span>
                    <span className="font-medium text-gray-900">
                      {patient.patientName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Gender:</span>
                    <span className="font-medium text-gray-900">
                      {patient.gender}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone:</span>
                    <span className="font-medium text-gray-900">
                      {patient.phone}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Appointment Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Token:</span>
                    <span className="font-medium text-blue-600">
                      {patient.tokenNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Time:</span>
                    <span className="font-medium text-gray-900">
                      {patient.appointmentTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span
                      className={`font-medium capitalize ${
                        patient.status === "current"
                          ? "text-green-600"
                          : patient.status === "no-show"
                          ? "text-red-600"
                          : "text-orange-600"
                      }`}
                    >
                      {patient.status === "no-show"
                        ? "No Show"
                        : patient.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to={`/consultation/${doctorId}/${patient.patientId}/${patient.id}`}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors text-center"
              >
                Start Consultation
              </Link>
              <Link className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors text-center">
                View History
              </Link>
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
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md border flex items-center relative"
      >
        <Menu className="h-6 w-6 text-gray-600" />
        {/* Show red dot above button if appointmentRequests exist */}
        {appointmentRequests.length > 0 && (
          <Dot className="h-12 w-12 text-red-600 absolute -top-6 -right-6" />
        )}
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`
          w-64 bg-white shadow-lg border-r h-screen fixed top-0 left-0 z-50 lg:z-auto flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
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

        {/* Logo Section - Fixed */}
        <div className="p-6 border-b flex-shrink-0">
          <div className="flex items-center mb-4">
            <Logo />
          </div>
        </div>

        {/* Doctor Profile Section - Fixed */}
        <div className="p-6 border-b flex-shrink-0">
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

        {/* Navigation - Fixed, no scrolling */}
        <nav className="p-4 flex-1 flex-shrink-0">
          <ul className="space-y-2">
            <li>
              <div className="flex items-center space-x-3 px-4 py-3 bg-blue-600 text-white rounded-lg">
                <Home className="h-5 w-5" />
                <span className="font-medium">Dashboard</span>
              </div>
            </li>
            <li>
              <button
                onClick={() => navigate("/Schedule")}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5" />
                  <span className="font-medium">Schedule</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/doctor-appointment-history")}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <History className="h-5 w-5" />
                  <span className="font-medium">Appointments</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </button>
            </li>
            <li>
              <Link
                to="/appointment-requests"
                className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <PlusSquare className="h-5 w-5 mr-3" />
                  <span className="font-medium">Requests </span>
                  <Dot
                    className={`h-9 w-9 mr-8 text-red-600 ${
                      appointmentRequests.length > 0 ? "block" : "hidden"
                    }`}
                  />
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </li>
            <li>
              <button
                onClick={() => navigate("/doctor-profile")}
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

        {/* Logout - Fixed at bottom */}
        <div className="p-4 border-t flex-shrink-0">
          <Link
            to="/logout"
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </Link>
        </div>
      </div>

      {/* Main Content - Scrollable with left margin for sidebar */}
      <div className="lg:ml-64 min-h-screen">
        <div className="h-screen overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                      <p className="text-sm text-gray-600">Remaining</p>
                      <p className="text-xl sm:text-2xl font-bold text-green-600">
                        {todayStats.remaining}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Missed</p>
                      <p className="text-xl sm:text-2xl font-bold text-orange-600">
                        {todayStats.Missed}
                      </p>
                    </div>
                    <XCircle className="h-8 w-8 text-orange-600" />
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
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setShowAddPatientModal(true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Walk-in Patient
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="space-y-4">
                    {patientQueue.map((patient) => (
                      <div
                        key={patient.id}
                        className="border rounded-lg p-4 transition-colors"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          {/* Left Section */}
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-3">
                              <div className="h-14 w-14 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                <img
                                  src={patient.image || "/default-avatar.png"}
                                  alt={patient.patientName}
                                  className="h-full w-full object-cover"
                                />
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-gray-900">
                                    {patient.patientName}
                                  </h3>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      patient.bookingType === "online"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-orange-100 text-orange-800"
                                    }`}
                                  >
                                    {patient.bookingType === "online"
                                      ? "Online"
                                      : "Walk-in"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Token and Time Adjusted */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
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
                            </div>
                          </div>

                          {/* Right Side Buttons */}
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Link
                              to={`/consultation/${doctorId}/${patient.patientId}/${patient.id}`}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                            >
                              Start Consultation
                            </Link>
                            <button
                              onClick={() => setSelectedPatient(patient)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </button>

                            <button
                              onClick={() => handleMarkAsNoShow(patient.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                            >
                              <UserX className="h-4 w-4 mr-2" />
                              No Show
                            </button>

                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                              Complete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {patientQueue.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Users className="mx-auto mb-2 h-10 w-10 text-gray-300" />
                        <p className="text-lg font-medium">
                          No patients in the queue right now.
                        </p>
                        <p className="text-sm mt-1">
                          New patients will appear here as they are added.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Missed Appointments Section */}
              {missedAppointments.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border">
                  <div className="p-4 sm:p-6 border-b">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                        <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mr-2" />
                        Missed Appointments
                      </h2>
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        {missedAppointments.length} No Show
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="space-y-4">
                      {missedAppointments.map((patient) => (
                        <div
                          key={patient.id}
                          className="border border-red-200 rounded-lg p-4 bg-red-50 transition-colors"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-4 mb-3">
                                <div className="h-14 w-14 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                  <img
                                    src={patient.image || "/default-avatar.png"}
                                    alt={patient.patientName}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-gray-900">
                                      {patient.patientName}
                                    </h3>
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        patient.bookingType === "online"
                                          ? "bg-blue-100 text-blue-800"
                                          : "bg-orange-100 text-orange-800"
                                      }`}
                                    >
                                      {patient.bookingType === "online"
                                        ? "Online"
                                        : "Walk-in"}
                                    </span>
                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                                      No Show
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                                <div>
                                  <p className="text-gray-500">Token</p>
                                  <p className="font-medium text-blue-600">
                                    {patient.tokenNumber}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500">
                                    Scheduled Time
                                  </p>
                                  <p className="font-medium">
                                    {patient.appointmentTime}
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
                              <button
                                onClick={() =>
                                  handleMoveBackToQueue(patient.id)
                                }
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                              >
                                <Users className="h-4 w-4 mr-2" />
                                Move to Queue
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Patient Details Modal */}
      <PatientDetailsModal
        patient={selectedPatient}
        onClose={() => setSelectedPatient(null)}
      />

      {/* Add Offline Patient Modal */}
      {showAddPatientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Add Walk-in Patient
                </h2>
                <button
                  onClick={() => setShowAddPatientModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <form onSubmit={handleAddOfflinePatient} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    value={offlinePatientForm.name}
                    onChange={(e) =>
                      handleOfflinePatientInputChange("name", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter patient name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="number"
                    value={offlinePatientForm.phone}
                    onChange={(e) =>
                      handleOfflinePatientInputChange("phone", e.target.value)
                    }
                    maxLength={11}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    value={offlinePatientForm.gender}
                    onChange={(e) =>
                      handleOfflinePatientInputChange("gender", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-1" />
                    <div>
                      <h5 className="font-medium text-yellow-900">
                        Walk-in Patient
                      </h5>
                      <p className="text-yellow-800 text-sm mt-1">
                        This patient will be added to the current queue and
                        assigned the next available token number.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddPatientModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                  >
                    Add to Queue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
