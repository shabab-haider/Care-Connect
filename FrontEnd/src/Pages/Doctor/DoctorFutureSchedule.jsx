"use client";

import { useState, useEffect, useContext } from "react";
import { Calendar, Filter, Search, Eye, User, Phone, Hash } from "lucide-react";
import Header from "../../Components/Header";
import axios from "axios";
import { DoctorDataContext } from "../../Context/DoctorContext";

const DoctorFutureSchedule = () => {
  const { doctor, setDoctor } = useContext(DoctorDataContext);
  const id = doctor._id;

  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filters, setFilters] = useState({
    selectedDate: "",
    search: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getFutureAppointments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/doctors/getFutureAppointments/${id}`
        );
        console.log(response.data);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching future appointments:", error);
      }
    };
    getFutureAppointments();
  }, [token]);

  // Filter appointments based on selected filters
  useEffect(() => {
    let filtered = [...appointments];

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
          apt.patientName
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          apt.phone.toLowerCase().includes(filters.search.toLowerCase())
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

  const AppointmentDetailsModal = ({ appointment, onClose }) => {
    if (!appointment) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Upcoming Appointment Details
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
            {/* Patient & Appointment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Patient Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">
                      {appointment.patientName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{appointment.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gender:</span>
                    <span className="font-medium">{appointment.gender}</span>
                  </div>
                </div>
              </div>
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
                    <span className="text-gray-600">Token:</span>
                    <span className="font-medium text-blue-600">
                      A-{appointment.TokenNo}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking Type:</span>
                    <span className="font-medium">
                      {appointment.bookingType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      Scheduled
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Symptoms if available */}
            {appointment.symptoms && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Symptoms/Reason for Visit
                </h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {appointment.symptoms}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                <Phone className="h-4 w-4 mr-2" />
                Call Patient
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                <Calendar className="h-4 w-4 mr-2" />
                Reschedule
              </button>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
                <Calendar className="h-8 w-8 text-blue-600 mr-3" />
                Future Schedule
              </h1>
              <p className="text-gray-600 mt-2">
                View and manage your upcoming patient appointments
              </p>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg border">
              <p className="text-sm text-gray-600">Upcoming Appointments</p>
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
                    placeholder="Search by patient name or phone number..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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
                Scheduled Appointments ({filteredAppointments.length})
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
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">
                              {appointment.patientName}
                            </h3>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              Scheduled
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">
                            {appointment.phone} • {appointment.gender}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(appointment.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Hash className="h-4 w-4 mr-1" />
                              Token: A-{appointment.TokenNo}
                            </div>
                            <div className="flex items-center">
                              <span className="text-green-600 font-medium">
                                {appointment.bookingType} Booking
                              </span>
                            </div>
                          </div>
                          {appointment.symptoms && (
                            <p className="text-sm text-gray-600 mt-1">
                              <span className="font-medium">Symptoms:</span>{" "}
                              {appointment.symptoms.length > 50
                                ? `${appointment.symptoms.substring(0, 50)}...`
                                : appointment.symptoms}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between lg:justify-end gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-blue-600">
                            Upcoming
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {appointment.bookingType}
                          </p>
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
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No upcoming appointments found
                </h3>
                <p className="text-gray-500 mb-6">
                  {filters.search || filters.selectedDate
                    ? "Try adjusting your filters to see more results."
                    : "No future appointments scheduled yet."}
                </p>
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

export default DoctorFutureSchedule;
