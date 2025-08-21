import { useContext, useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Star,
  Stethoscope,
  Send,
} from "lucide-react";
import BackButton from "../../Components/BackButton";
import LogoAndBack from "../../Components/LogoAndBack";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PatientDataContext } from "../../Context/PatientContext";
import { convertDate } from "../../Utils/dateUtils";
import { isCurrentTimeGreater } from "../../Utils/timeComparison";
import { getAppointmentNumber } from "../../Utils/getAppointmentNumber";
const AppointmentBooking = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [isTodayClosed, setIsTodayClosed] = useState(false);
  const [today, setToday] = useState(false);
  const [selectedToken, setSelectedToken] = useState("");
  const [selectedTokenNumber, setSelectedTokenNumber] = useState("");
  const { patient, setPatient } = useContext(PatientDataContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Template doctor data (will come from backend API)
  const [doctor, setDoctor] = useState({
    _id: "1",
    fullName: "Dr. Sarah Johnson",
    email: "sarah.johnson@careconnect.com",
    profileImage: "/placeholder.svg?height=120&width=120",
    phone: "+1 (555) 987-6543",
    professionalDetails: {
      specialization: "Cardiology",
      experience: "12",
      qualification: "MBBS, MD Cardiology",
      consultationFee: 800,
      avgAppointmentTime: 30,
    },
    clinicInfo: {
      clinicName: "Downtown Medical Center",
      address: "123 Medical St, Downtown",
      city: "New York",
      state: "New York",
      availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      clinicOpenTime: "09:00",
      clinicCloseTime: "17:00",
      appointmentsPerDay: 16,
    },
  });

  useEffect(() => {
    const getDoctor = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/doctors/${id}`
      );
      setDoctor(response.data);
    };
    getDoctor();
  }, []);

  // Template available dates (will come from backend API)
  const [availableDates, setAvailableDates] = useState([
    {
      date: "2024-01-15",
      displayDate: "Mon, Jan 15",
      dayName: "Monday",
      isToday: true,
    },
  ]);

  useEffect(() => {
    const getAvailableDates = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/doctors/${id}/availability`
      );
      setIsTodayClosed(response.data.isPastClosingTime);
      setAvailableDates(response.data.result);
      console.log(response.data.result);
    };
    getAvailableDates();
  }, []);

  const [availableSlots, setAvailableSlots] = useState({
    "2024-01-15": [
      {
        tokenNumber: "A-01",
        time: "09:00",
        displayTime: "9:00 AM",
        isBooked: true,
        isCurrentToken: false,
        patientName: "John Doe",
      },
      {
        tokenNumber: "A-02",
        time: "09:30",
        displayTime: "9:30 AM",
        isBooked: false,
        isCurrentToken: true,
        patientName: null,
      },
      {
        tokenNumber: "A-03",
        time: "10:00",
        displayTime: "10:00 AM",
        isBooked: false,
        isCurrentToken: false,
        patientName: null,
      },
      {
        tokenNumber: "A-04",
        time: "10:30",
        displayTime: "10:30 AM",
        isBooked: false,
        isCurrentToken: false,
        patientName: null,
      },
      {
        tokenNumber: "A-05",
        time: "11:00",
        displayTime: "11:00 AM",
        isBooked: true,
        isCurrentToken: false,
        patientName: "Jane Smith",
      },
      {
        tokenNumber: "A-06",
        time: "11:30",
        displayTime: "11:30 AM",
        isBooked: false,
        isCurrentToken: false,
        patientName: null,
      },
      {
        tokenNumber: "A-07",
        time: "14:00",
        displayTime: "2:00 PM",
        isBooked: false,
        isCurrentToken: false,
        patientName: null,
      },
      {
        tokenNumber: "A-08",
        time: "14:30",
        displayTime: "2:30 PM",
        isBooked: false,
        isCurrentToken: false,
        patientName: null,
      },
    ],
  });

  useEffect(() => {
    const getAvailableSlots = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/doctors/${id}/tokens`
      );
      if (response.status == "200") {
        console.log(response.data);
        setAvailableSlots(response.data);
      }
    };
    getAvailableSlots();
  }, [availableDates]);

  const currentSlots = selectedDate ? availableSlots[selectedDate] || [] : [];

  const handleSubmit = async (e) => {
    const appointmentNo = getAppointmentNumber(selectedTokenNumber);
    console.log(appointmentNo);
    e.preventDefault();
    console.log({
      doctorId: id,
      patientId: patient._id,
      selectedDate,
      selectedToken,
      appointmentNo,
    });
    // API call to send appointment request
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/appointments/request`,
      {
        doctorId: id,
        patientId: patient._id,
        selectedDate,
        selectedToken,
        appointmentNo,
      }
    );
    if (response.status == "201") {
      setShowSuccess(true);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <BackButton />
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Request Sent Successfully!
          </h2>
          <p className="text-gray-600 mb-4">
            Your appointment request has been sent to {doctor.fullName}.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="font-medium text-blue-900 mb-2">Request Details:</p>
            <div className="text-sm text-blue-800 space-y-1">
              <p>
                <strong>Token:</strong>{" "}
                {
                  currentSlots.find((slot) => slot.id === selectedToken)
                    ?.tokenNumber
                }
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {
                  currentSlots.find((slot) => slot.id === selectedToken)
                    ?.displayTime
                }
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-orange-600 font-medium">
                  Pending Approval
                </span>
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-medium text-yellow-800">
                  Waiting for Doctor's Approval
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  The doctor will review your request and confirm the
                  appointment. You'll receive an email notification once
                  approved.
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500 space-y-1">
            <p>📧 Email notification will be sent upon approval</p>
            <p>📱 You can check status in your dashboard</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-6xl mx-auto flex items-center">
          <LogoAndBack />
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Doctor Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={doctor.profileImage || "/placeholder.svg"}
              alt={doctor.fullName}
              className="w-24 h-24 rounded-xl object-cover mx-auto md:mx-0"
            />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {doctor.fullName}
              </h2>
              <p className="text-blue-600 font-medium mb-2">
                {doctor.professionalDetails.specialization}
              </p>
              <p className="text-gray-600 mb-3">
                {doctor.professionalDetails.qualification}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="text-gray-500 ml-1">
                    ({doctor.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Stethoscope className="h-4 w-4 mr-1" />
                  <span>{doctor.professionalDetails.experience} years exp</span>
                </div>
                <div className="flex items-center text-purple-600 font-medium">
                  <span>
                    (PKR){doctor.professionalDetails.consultationFee} consultation
                  </span>
                </div>
              </div>

              <div className="flex items-start justify-center md:justify-start">
                <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-1" />
                <div>
                  <p className="font-medium">{doctor.clinicInfo.clinicName}</p>
                  <p className="text-sm text-gray-600">
                    {doctor.clinicInfo.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    {doctor.clinicInfo.city}, {doctor.clinicInfo.state}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Patient Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Patient Name</p>
              <p className="font-medium text-gray-900">{patient?.fullname}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium text-gray-900">
                0{patient?.phoneNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Gender</p>
              <p className="font-medium text-gray-900 capitalize">
                {patient?.gender}
              </p>
            </div>
          </div>
        </div>

        {/* Token Selection */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Select Date & Token
          </h3>

          {/* Date Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Available Dates
              {isTodayClosed && (
                <span className="ml-1 text-red-600 text-xs font-semibold">
                  (Clinic Is Closed For Today)
                </span>
              )}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {availableDates.map((dateObj) => (
                <button
                  key={dateObj.date}
                  onClick={() => {
                    setToday(dateObj.isToday);
                    setSelectedDate(dateObj.date);
                    console.log("Today :", today);
                  }}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    selectedDate === dateObj.date
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="font-medium">{dateObj.displayDate}</div>
                  <div className="text-sm text-gray-600">{dateObj.dayName}</div>
                  {dateObj.isToday && (
                    <div className="text-xs text-green-600 font-medium">
                      Today
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Token Selection */}
          {selectedDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Available Tokens for{" "}
                {new Date(selectedDate).toLocaleDateString()}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                {currentSlots.map((slot) => (
                  <button
                    key={slot.tokenNumber}
                    onClick={() => {
                      setSelectedToken(slot.id);
                      setSelectedTokenNumber(slot.tokenNumber);
                    }}
                    disabled={
                      slot.isBooked || isCurrentTimeGreater(slot.time, today)
                    }
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      selectedToken === slot.id
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : slot.isBooked ||
                          isCurrentTimeGreater(slot.time, today)
                        ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="font-bold text-lg">{slot.tokenNumber}</div>
                    <div className="text-sm">{slot.displayTime}</div>
                    {slot.isBooked ? (
                      <div className="text-xs text-red-600 mt-1">Booked</div>
                    ) : slot.isCurrentToken ? (
                      <div className="text-xs text-green-600 mt-1">Current</div>
                    ) : isCurrentTimeGreater(slot.time, today) ? (
                      <div className="text-xs text-red-600 mt-1">Passed</div>
                    ) : (
                      <div className="text-xs text-green-600 mt-1">
                        Available
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {currentSlots.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p>No slots available for this date</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Selected Token Summary & Send Request Button */}
        {selectedToken && (
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
              <h4 className="font-medium text-blue-900 mb-2">
                Appointment Request Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                <div>
                  <p>
                    <strong>Patient:</strong> {patient?.fullname}
                  </p>
                  <p>
                    <strong>Token:</strong>{" "}
                    {
                      currentSlots.find((slot) => slot.id === selectedToken)
                        ?.tokenNumber
                    }
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(selectedDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Time:</strong>{" "}
                    {
                      currentSlots.find((slot) => slot.id === selectedToken)
                        ?.displayTime
                    }
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-lg font-semibold text-blue-900">
                  <strong>Consultation Fee:</strong> (PKR)
                  {doctor.professionalDetails.consultationFee}
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    Request Process
                  </p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Your request will be sent to the doctor for approval. You'll
                    receive an email confirmation once the doctor accepts your
                    appointment request.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!selectedToken}
              className={`w-full py-4 px-6 rounded-lg font-medium text-lg transition-colors ${
                !selectedToken
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              <div className="flex items-center justify-center">
                <Send className="h-5 w-5 mr-2" />
                Send Appointment Request
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;
