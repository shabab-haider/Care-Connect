import { useContext, useEffect, useState } from "react";
import {
  Calendar,
  User,
  Search,
  LogOut,
  FileText,
  Stethoscope,
  History,
  Eye,
  Pill,
  Home,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import PrescriptionCardList from "../../Components/PrescriptionCardList";
import Logo from "../../Components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { PatientDataContext } from "../../Context/PatientContext";
import axios from "axios";
import { toast } from "react-toastify";
import FloatingChatbot from "../../Components/FloatingChatbot";

const PatientDashboard = () => {
  const { patient, setPatient } = useContext(PatientDataContext);
  const navigate = useNavigate();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data - replace with real data from your backend
  const patientData = {
    name: patient.fullname,
    profileImage: patient.profileImage,
  };

  const isPrescriptionValid = (validityDate) => {
    console.log(new Date());
    return new Date(validityDate) >= new Date();
  };

  // Current medicines data
  const [prescriptions, setPrescriptions] = useState([
    {
      prescriptionId: "presc-001",
      doctorName: "Dr. Ali",
      validity: "2025-08-07",
      medicines: [
        {
          name: "Amoxicillin",
          dosage: "500mg",
          frequency: ["Morning", "Evening"],
          instructions: "Khana khanay ke baad lena",
        },
        {
          name: "Paracetamol",
          dosage: "650mg",
          frequency: ["Night"],
          instructions: "Bukhār mein lena",
        },
      ],
    },
    {
      prescriptionId: "presc-002",
      doctorName: "Dr. Fatima",
      validity: "2025-08-03",
      medicines: [
        {
          name: "Offalyne Syrup",
          dosage: "2 spoons",
          frequency: ["Morning", "Night"],
          instructions: "Sirf khaansi ke waqt lena",
        },
      ],
    },
    {
      prescriptionId: "presc-003",
      doctorName: "Dr. Hamza",
      validity: "2025-08-05",
      medicines: [
        {
          name: "Cetirizine",
          dosage: "10mg",
          frequency: ["Night"],
          instructions: "Sone se pehle lena",
        },
      ],
    },
  ]);

  useEffect(() => {
    const getPrescriptions = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/medicalRecord/valid-medical-records/${patient._id}`
        );
        console.log(response.data);
        setPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
        toast.error("Error in fetching prescriptions");
      }
    };
    getPrescriptions();
  }, []);

  //Template data for upcommingAppointments
  // [
  //   {
  //     id: 1,
  //     date: "2024-01-15",
  //     time: "10:30 AM",
  //     tokenNumber: "A-15",
  //     estimatedWait: "15 minutes",
  //     doctor: {
  //       name: "Dr. Sarah Johnson",
  //       specialization: "Cardiologist",
  //       clinic: "City Heart Hospital",
  //       address: "123 Medical St, Downtown",
  //       phone: "+1 (555) 987-6543",
  //       fee: 500,
  //     },
  //     status: "confirmed",
  //   }
  // ];

  const token = localStorage.getItem("token");

  const [upcomingAppointments, setUpcommingAppointments] = useState([]);

  useEffect(() => {
    const getUpcomingAppointments = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/patients/upcomingAppointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setUpcommingAppointments(response.data);
    };
    getUpcomingAppointments();
  }, []);

  const [recentAppointments, setRecentAppointments] = useState([]);

  //recent appointments template
  //  [ {
  //       id: 3,
  //       date: "2024-01-10",
  //       time: "11:00 AM",
  //       doctor: "Dr. Emily Davis",
  //       specialization: "General Physician",
  //       clinic: "City General Hospital",
  //       fee: 300,
  //       status: "no_show",
  //       profileImage: "",
  //     }]

  useEffect(() => {
    const getRecentAppointments = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/patients/recentAppointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setRecentAppointments(response.data);
    };
    getRecentAppointments();
  }, []);

  const AppointmentDetailsModal = ({ appointment, onClose }) => {
    if (!appointment) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Appointment Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Token Status */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Token Status</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-green-600">
                    {appointment.tokenNumber}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Your Token
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-orange-600">
                    {appointment.status == "pending"
                      ? "pending"
                      : appointment.estimatedWait}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Estimated Wait
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold capitalize text-green-600">
                    {appointment.status}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Status</div>
                </div>
              </div>
            </div>

            {/* Appointment & Doctor Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Appointment Info */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Appointment Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {new Date(appointment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{appointment.time}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Fee:</span>
                    <span className="font-medium">
                      (PKR){appointment.doctor.fee}
                    </span>
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Doctor Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Doctor:</span>
                    <span className="font-medium">
                      {appointment.doctor.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Specialization:</span>
                    <span className="font-medium">
                      {appointment.doctor.specialization}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Clinic:</span>
                    <span className="font-medium">
                      {appointment.doctor.clinic}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-gray-600">Address:</span>
                    <span className="font-medium text-right max-w-[180px] truncate">
                      {appointment.doctor.address}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">
                      {appointment.doctor.phone}
                    </span>
                  </div>
                </div>
              </div>
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

      {/* Sidebar - Fixed with 100vh height, non-scrollable */}
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

        {/* Profile Section - Fixed */}
        <div className="p-6 border-b flex-shrink-0">
          <div className="flex items-center space-x-3">
            <img
              src={patientData.profileImage || "/placeholder.svg"}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
            />
            <div>
              <p className="font-semibold text-gray-900">{patientData.name}</p>
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
              <Link
                to="/find-doctor"
                className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Search className="h-5 w-5" />
                  <span className="font-medium">Find Doctors</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </li>
            <li>
              <Link
                to={`/medical-record/${patient._id}`}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5" />
                  <span className="font-medium">Medical History</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </li>
            <li>
              <Link
                to="/patient-appointment-history"
                className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <History className="h-5 w-5" />
                  <span className="font-medium">Appointments</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </li>
            <li>
              <Link
                to="/patient-profile"
                className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5" />
                  <span className="font-medium">Profile</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
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
                  Welcome, {patientData.name}!
                </h1>
                <p className="text-blue-100 text-sm sm:text-base">
                  Here's your health dashboard overview
                </p>
              </div>
              {/* Current Medicines Section */}
              <div className="bg-white rounded-2xl shadow-sm border">
                <div className="p-4 sm:p-6 border-b">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                      <Pill className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mr-2" />
                      Current Medicines
                    </h2>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium self-start sm:self-auto">
                      {prescriptions.length} Active
                    </span>
                  </div>
                </div>
                <div>
                  <PrescriptionCardList prescriptions={prescriptions} />
                </div>
              </div>
              {/* Upcoming Appointments Section */}
              <div className="bg-white rounded-2xl shadow-sm border">
                <div className="p-4 sm:p-6 border-b">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mr-2" />
                    Upcoming Appointments
                  </h2>
                </div>
                <div className="p-4 sm:p-6">
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-4 mb-3">
                                <div className="h-14 w-14 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                  <img
                                    src={appointment.doctor.profileImage}
                                    alt={appointment.doctor.doctorName}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900">
                                    {appointment.doctor.name}
                                  </h3>
                                  <p className="text-gray-600 text-sm">
                                    {appointment.doctor.specialization}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-500">Date</p>
                                  <p className="font-medium">
                                    {new Date(
                                      appointment.date
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Time</p>
                                  <p className="font-medium">
                                    {appointment.time}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Token</p>
                                  <p className="font-medium text-blue-600">
                                    {appointment.tokenNumber}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Est. Wait</p>
                                  <p className="font-medium text-orange-600">
                                    {appointment.status == "pending"
                                      ? "pending"
                                      : appointment.estimatedWait}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                setSelectedAppointment(appointment)
                              }
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center w-full lg:w-auto"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No upcoming appointments</p>
                      <button
                        onClick={() => navigate("/find-doctor")}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Book Appointment
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* Recent Appointments Section */}
              <div className="bg-white rounded-2xl shadow-sm border">
                <div className="p-4 sm:p-6 border-b">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                      <History className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mr-2" />
                      Recent Appointments
                    </h2>
                    <Link
                      to="/patient-appointment-history"
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center self-start sm:self-auto"
                    >
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="space-y-4">
                    {recentAppointments.length > 0 ? (
                      recentAppointments.slice(0, 3).map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-4"
                        >
                          <div className="flex items-center space-x-4">
                            <img
                              src={appointment.profileImage}
                              alt="Profile"
                              className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                            />
                            <div>
                              <p className="font-medium text-gray-900">
                                {appointment.doctor}
                              </p>
                              <p className="text-sm text-gray-600">
                                {appointment.specialization} •{" "}
                                {appointment.clinic}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(
                                  appointment.date
                                ).toLocaleDateString()}{" "}
                                at {appointment.time}
                              </p>
                            </div>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="text-xs text-gray-500">
                              (PKR){appointment.fee}
                            </p>
                            <span
                              className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                                appointment.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {appointment.status}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                          No recent appointments found
                        </p>
                        <button
                          onClick={() => navigate("/find-doctor")}
                          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          Book Appointment
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FloatingChatbot />
      {/* Appointment Details Modal */}
      <AppointmentDetailsModal
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
      />
    </div>
  );
};

export default PatientDashboard;
