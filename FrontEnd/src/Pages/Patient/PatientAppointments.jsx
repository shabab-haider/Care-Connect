"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  History,
  Calendar,
  Clock,
  Filter,
  Search,
  ChevronDown,
  Eye,
  FileText,
  Hash,
} from "lucide-react";
import Header from "../../Components/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PatientAppointments = () => {
  const navigate = useNavigate();
  //recent appointments template
  //  [ {
  //       id: 3,
  //       date: "2024-01-10",
  //       TokenNo: "2",
  //       doctor: "Dr. Emily Davis",
  //       specialization: "General Physician",
  //       clinic: "City General Hospital",
  //       fee: 300,
  //       status: "no_show",
  //       profileImage: "",
  //     }]
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    selectedDate: "",
    search: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getAppointments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/patients/recentAppointments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        setAppointments(response.data);
        setFilteredAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Error in fetching appointments");
      } finally {
        setLoading(false);
      }
    };
    getAppointments();
  }, [token]);

  // Filter appointments based on selected filters
  useEffect(() => {
    let filtered = [...appointments];

    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter((apt) => apt.status === filters.status);
    }

    // Filter by selected date
    if (filters.selectedDate) {
      filtered = filtered.filter((apt) => {
        // Convert appointment date string to comparable format
        const appointmentDate = new Date(apt.date).toISOString().split("T")[0];
        return appointmentDate === filters.selectedDate;
      });
    }

    // Filter by search
    if (filters.search) {
      filtered = filtered.filter(
        (apt) =>
          apt.doctor.toLowerCase().includes(filters.search.toLowerCase()) ||
          apt.specialization
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          apt.clinic.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredAppointments(filtered);
  }, [appointments, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "no_show":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "no_show":
        return "No Show";
      default:
        return status;
    }
  };

  const AppointmentDetailsModal = ({ appointment, onClose }) => {
    if (!appointment) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6 border-b">
            <div className="flex justify-between items-center">
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
          </div>
          <div className="p-4 sm:p-6 space-y-6">
            {/* Appointment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
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
                    <span className="text-gray-600">Token No:</span>
                    <span className="font-medium">A-{appointment.TokenNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`font-medium px-2 py-1 rounded-full text-xs ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {getStatusLabel(appointment.status)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fee:</span>
                    <span className="font-medium">PKR {appointment.fee}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Doctor Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Doctor:</span>
                    <span className="font-medium">{appointment.doctor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Specialization:</span>
                    <span className="font-medium">
                      {appointment.specialization}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Clinic:</span>
                    <span className="font-medium">{appointment.clinic}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prescription/Diagnosis if available */}
            {appointment.diagnosis && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Diagnosis</h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {appointment.diagnosis}
                </p>
              </div>
            )}

            {appointment.prescription && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Prescription
                </h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {appointment.prescription}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              {appointment.status === "completed" && (
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Prescription
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
                <History className="h-8 w-8 text-blue-600 mr-3" />
                My Appointments
              </h1>
              <p className="text-gray-600 mt-2">
                View and manage all your appointments
              </p>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg border">
              <p className="text-sm text-gray-600">Total Appointments</p>
              <p className="text-2xl font-bold text-blue-600">
                {appointments.length}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border mb-6">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search by doctor, specialization, or clinic..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="no_show">No Show</option>
                </select>
              </div>

              {/* Date Filter */}
              <div className="relative">
                <div className="flex items-center">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10" />
                  <input
                    type="date"
                    value={filters.selectedDate}
                    onChange={(e) =>
                      handleFilterChange("selectedDate", e.target.value)
                    }
                    className="appearance-none bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {filters.selectedDate && (
                  <button
                    onClick={() => handleFilterChange("selectedDate", "")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-2xl shadow-sm border">
          <div className="p-4 sm:p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Appointments ({filteredAppointments.length})
              </h2>
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="p-4 sm:p-6">
            {filteredAppointments.length > 0 ? (
              <div className="space-y-4">
                {filteredAppointments.map((appointment, index) => (
                  <div
                    key={appointment.id || index}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4 flex-1">
                        <img
                          src={
                            appointment.profileImage ||
                            "/placeholder.svg?height=48&width=48" ||
                            "/placeholder.svg"
                          }
                          alt="Doctor"
                          className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {appointment.doctor}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {appointment.specialization} • {appointment.clinic}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(appointment.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Hash className="h-4 w-4 mr-1" />
                              A-{appointment.TokenNo}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between lg:justify-end gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            PKR {appointment.fee}
                          </p>
                          <span
                            className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              appointment.status
                            )}`}
                          >
                            {getStatusLabel(appointment.status)}
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedAppointment(appointment)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <History className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No appointments found
                </h3>
                <p className="text-gray-500 mb-6">
                  {filters.search ||
                  filters.status !== "all" ||
                  filters.selectedDate
                    ? "Try adjusting your filters to see more results."
                    : "You haven't booked any appointments yet."}
                </p>
                {!filters.search &&
                  filters.status === "all" &&
                  !filters.selectedDate && (
                    <button
                      onClick={() => {
                        navigate("/find-doctor");
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Book Your First Appointment
                    </button>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Details Modal */}
      <AppointmentDetailsModal
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
      />
    </div>
  );
};

export default PatientAppointments;
