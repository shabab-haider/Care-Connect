import { useEffect, useState } from "react";
import { Calendar, Clock, User, CheckCircle, XCircle } from "lucide-react";
import LogoAndBack from "../../Components/LogoAndBack";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorPendingRequests = () => {
  const navigate = useNavigate();
  // Dummy data for appointment requests
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [updateAppointmentRequests, setUpdateAppointmentRequests] = useState(0);
  //template for appointmentRequests
  // [
  //   {
  //     id: 1,
  //     patientName: "John Smith",
  //     patientPhone: "+91 9876543210",
  //     patientEmail: "john.smith@email.com",
  //     appointmentDate: "2024-01-15",
  //     appointmentTime: "10:00 AM",
  //     tokenNumber: "A-03",
  //   },
  // ];

  const token = localStorage.getItem("token");

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
      console.log(response);
      if (response.status == "200") {
        setAppointmentRequests(response.data.appointments);
      }
    };
    getPendingAppointments();
  }, [updateAppointmentRequests]);

  // Function to handle accept appointment request
  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/appointments/${requestId}/accept`
      );
      if (response.status == "200") {
        setUpdateAppointmentRequests(updateAppointmentRequests + 1);
      }
    } catch (error) {
      console.error("Error accepting request:", error);

      alert("Error accepting request. Please try again.");
    }
  };

  // Function to handle reject appointment request
  const handleRejectRequest = async (requestId, appointmentId, doctorId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/appointments/reject`,
        {
          tokenId: requestId,
          appointmentId,
          doctorId,
        }
      );
      if (response.status == "200") {
        setUpdateAppointmentRequests(updateAppointmentRequests + 1);
      }
    } catch (error) {
      console.error("Error rejecting request:", error);

      alert("Error rejecting request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-3 px-6 md:px-14 w-full bg-white shadow-lg border-b sticky top-0 z-40">
        <LogoAndBack />
      </div>

      <div className="max-w-6xl mx-4 md:mx-auto mt-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pending Appointment Requests
          </h1>
          <p className="text-gray-600">
            Review and manage incoming appointment requests from patients
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg mr-4">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {appointmentRequests.length} Pending Requests
              </h3>
              <p className="text-gray-600">Waiting for your approval</p>
            </div>
          </div>
        </div>

        {/* Appointment Request Cards */}
        {appointmentRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              All Caught Up!
            </h3>
            <p className="text-gray-600">
              No pending appointment requests at the moment.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {appointmentRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left Side - Patient & Appointment Info */}
                  <div className="flex-1">
                    {/* Patient Info Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {request.patientName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {request.patientPhone}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(
                                request.appointmentDate
                              ).toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {request.appointmentTime}
                            </p>
                            <p className="text-xs text-gray-600">
                              Token: {request.tokenNumber}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Action Buttons */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
                    <button
                      onClick={() => handleAcceptRequest(request.id)}
                      className="flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        handleRejectRequest(
                          request.tokenId,
                          request.id,
                          request.doctorId
                        )
                      }
                      className="flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPendingRequests;
