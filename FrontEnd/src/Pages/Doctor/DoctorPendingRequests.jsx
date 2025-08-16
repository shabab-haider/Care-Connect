import { useState } from "react"
import { Calendar, Clock, User, CheckCircle, XCircle } from "lucide-react"

const DoctorPendingRequests = () => {
  // Dummy data for appointment requests
  const [appointmentRequests, setAppointmentRequests] = useState([
    {
      id: 1,
      patientName: "John Smith",
      patientPhone: "+91 9876543210",
      patientEmail: "john.smith@email.com",
      appointmentDate: "2024-01-15",
      appointmentTime: "10:00 AM",
      tokenNumber: "A-03",
      symptoms: "Chest pain and shortness of breath for the past 2 days",
      appointmentType: "Consultation",
      requestedAt: "2 hours ago",
    },
    {
      id: 2,
      patientName: "Emily Davis",
      patientPhone: "+91 8765432109",
      patientEmail: "emily.davis@email.com",
      appointmentDate: "2024-01-15",
      appointmentTime: "11:30 AM",
      tokenNumber: "A-06",
      symptoms: "Regular checkup and blood pressure monitoring",
      appointmentType: "Checkup",
      requestedAt: "4 hours ago",
    },
    {
      id: 3,
      patientName: "Michael Brown",
      patientPhone: "+91 7654321098",
      patientEmail: "michael.brown@email.com",
      appointmentDate: "2024-01-16",
      appointmentTime: "2:00 PM",
      tokenNumber: "A-07",
      symptoms: "Follow-up for diabetes management and medication review",
      appointmentType: "Follow-up",
      requestedAt: "6 hours ago",
    },
    {
      id: 4,
      patientName: "Sarah Wilson",
      patientPhone: "+91 6543210987",
      patientEmail: "sarah.wilson@email.com",
      appointmentDate: "2024-01-16",
      appointmentTime: "3:30 PM",
      tokenNumber: "A-09",
      symptoms: "Severe headache and dizziness since yesterday",
      appointmentType: "Consultation",
      requestedAt: "8 hours ago",
    },
  ])

  const [processingId, setProcessingId] = useState(null)

  // Function to handle accept appointment request
  const handleAcceptRequest = async (requestId) => {
    setProcessingId(requestId)

    try {
      // TODO: Add API call to accept appointment request
      // const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/appointments/${requestId}/accept`);
      // if (response.data.success) {
      //   // Remove the accepted request from the list
      //   setAppointmentRequests(prev => prev.filter(req => req.id !== requestId));
      //   alert('Appointment request accepted successfully!');
      // }

      // Simulate API call delay
      setTimeout(() => {
        setAppointmentRequests((prev) => prev.filter((req) => req.id !== requestId))
        setProcessingId(null)
        alert("Appointment request accepted successfully!")
      }, 1500)
    } catch (error) {
      console.error("Error accepting request:", error)
      setProcessingId(null)
      alert("Error accepting request. Please try again.")
    }
  }

  // Function to handle reject appointment request
  const handleRejectRequest = async (requestId) => {
    setProcessingId(requestId)

    try {
      // TODO: Add API call to reject appointment request
      // const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/appointments/${requestId}/reject`);
      // if (response.data.success) {
      //   // Remove the rejected request from the list
      //   setAppointmentRequests(prev => prev.filter(req => req.id !== requestId));
      //   alert('Appointment request rejected.');
      // }

      // Simulate API call delay
      setTimeout(() => {
        setAppointmentRequests((prev) => prev.filter((req) => req.id !== requestId))
        setProcessingId(null)
        alert("Appointment request rejected.")
      }, 1500)
    } catch (error) {
      console.error("Error rejecting request:", error)
      setProcessingId(null)
      alert("Error rejecting request. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pending Appointment Requests</h1>
          <p className="text-gray-600">Review and manage incoming appointment requests from patients</p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg mr-4">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{appointmentRequests.length} Pending Requests</h3>
              <p className="text-gray-600">Waiting for your approval</p>
            </div>
          </div>
        </div>

        {/* Appointment Request Cards */}
        {appointmentRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-600">No pending appointment requests at the moment.</p>
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
                          <h3 className="text-lg font-semibold text-gray-900">{request.patientName}</h3>
                          <p className="text-sm text-gray-600">{request.patientPhone}</p>
                        </div>
                      </div>
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                        {request.requestedAt}
                      </span>
                    </div>

                    {/* Appointment Details */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(request.appointmentDate).toLocaleDateString("en-US", {
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
                            <p className="text-sm font-medium text-gray-900">{request.appointmentTime}</p>
                            <p className="text-xs text-gray-600">Token: {request.tokenNumber}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{request.appointmentType}</p>
                        </div>
                      </div>

                      {/* Symptoms */}
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Symptoms/Reason:</p>
                        <p className="text-sm text-gray-600 bg-white p-3 rounded border">{request.symptoms}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Action Buttons */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
                    <button
                      onClick={() => handleAcceptRequest(request.id)}
                      disabled={processingId === request.id}
                      className="flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
                    >
                      {processingId === request.id ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accept
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleRejectRequest(request.id)}
                      disabled={processingId === request.id}
                      className="flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
                    >
                      {processingId === request.id ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorPendingRequests
