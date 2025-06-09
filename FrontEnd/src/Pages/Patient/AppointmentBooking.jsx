import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import defaultProfile from "/Images/DefaultProfile.jpeg";
import axios from "axios";
import {
  ChevronLeft,
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import PatientHeader from "../../Components/PatientHeader";
import { PatientDataContext } from "../../Context/PatientContext";

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const doctorId = params.doctorId;
  const [update, setUpdate] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");

  const { patient, setpatient } = useContext(PatientDataContext);

  useEffect(() => {
    const findDoctor = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/doctors/finddoctor`,
          {
            _id: doctorId,
          }
        );
        if (response.status === 200) {
          setSelectedDoctor(response.data.doctor);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
        setLoading(false);
      }
    };
    findDoctor();
  }, [doctorId]);

  useEffect(() => {
    const handleSlots = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/doctors/${doctorId}/${day}/${date}`
      );
      setTimeSlots(response.data.slots);
    };
    handleSlots();
  }, [update]);

  // Get current date and upcoming week
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  // Generate upcoming 7 days starting from today
  const getUpcomingWeek = () => {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      week.push(date);
    }
    return week;
  };

  const upcomingWeek = getUpcomingWeek();

  // Available time slots
  const [timeSlots, setTimeSlots] = useState([]);

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(""); // Reset time when date changes
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  // Format date for display
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Handle confirm appointment
  const handleConfirmAppointment = async () => {
    if (!selectedTime) {
      alert("Please select a time slot");
      return;
    }

    const isoDate = selectedDate.toISOString().split("T")[0];

    const appointmentData = {
      doctorId,
      patientId: patient._id,
      appointmentDate: isoDate,
      appointmentTime: selectedTime,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/appointments/request`,
      appointmentData
    );
    if (response.status == 201) {
      setUpdate(update + 1);
    }
    console.log("Appointment confirmed:", appointmentData);

    // Here you would typically send the appointment data to your backend
    toast.success("Appointment booked successfully!");
  };

  // Format full date for display
  const formatFullDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Check if a date is selected
  const isDateSelected = (date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Check if a time is selected
  const isTimeSelected = (time) => {
    return time === selectedTime;
  };

  // Check if date is today
  const isToday = (date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctor information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <PatientHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Doctor Information - Left Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={selectedDoctor.profileImage || defaultProfile}
                    alt={`Dr. ${selectedDoctor.fullname}`}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover mx-auto border-4 border-gray-100"
                  />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-4">
                  Dr. {selectedDoctor.fullname}
                </h2>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mt-2">
                  {selectedDoctor.specialization || "Doctor"}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-600 break-all">
                      {selectedDoctor.email}
                    </p>
                  </div>
                </div>

                {selectedDoctor.basicInfo?.phoneNumber && (
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600">
                        {selectedDoctor.basicInfo.phoneNumber}
                      </p>
                    </div>
                  </div>
                )}

                {selectedDoctor.clinicInfo?.clinicAddress && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600">
                        {selectedDoctor.clinicInfo.clinicAddress}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Appointment Booking - Right Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Select Date & Time
              </h3>

              {/* Date Selection - Upcoming Week */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  Choose a Date (Next 7 Days)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {upcomingWeek.map((date, index) => (
                    <button
                      key={index}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        isDateSelected(date)
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      } ${isToday(date) ? "ring-2 ring-blue-200" : ""}`}
                      onClick={() => {
                        handleDateSelect(date);
                        if (date) {
                          setDay(
                            date.toLocaleDateString("en-US", {
                              weekday: "long",
                            })
                          );
                          setDate(date.toISOString().split("T")[0]);
                          setUpdate(update + 1);
                        }
                      }}
                    >
                      <div className="text-center">
                        <div className="text-xs font-medium text-gray-500 mb-1">
                          {date.toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </div>
                        <div className="text-lg font-semibold">
                          {date.getDate()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {date.toLocaleDateString("en-US", { month: "short" })}
                        </div>
                        {isToday(date) && (
                          <div className="text-xs text-blue-600 font-medium mt-1">
                            Today
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {!selectedDate ? (
                <div className="text-gray-500 mb-4">
                  Please select a date to see time slots.
                </div>
              ) : (
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Available Time Slots
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {timeSlots && timeSlots.length > 0 ? (
                      timeSlots.map((time) => (
                        <button
                          key={time}
                          className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${
                            isTimeSelected(time)
                              ? "border-blue-500 bg-blue-500 text-white"
                              : "border-gray-200 hover:border-blue-300 text-gray-700 hover:bg-blue-50"
                          }`}
                          onClick={() => handleTimeSelect(time)}
                        >
                          <div className="font-medium">{time}</div>
                        </button>
                      ))
                    ) : (
                      <div className="col-span-full text-center text-gray-500 py-6">
                        No slots available for this date.
                      </div>
                    )}
                  </div>
                </div>
              )}
              {selectedTime && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                    Appointment Summary
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">
                        Dr. {selectedDoctor.fullname}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">
                        {formatFullDate(selectedDate)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{selectedTime}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Confirm Button */}
              <button
                className={`w-full py-4 px-6 rounded-lg font-medium transition-all duration-200 ${
                  selectedTime && selectedDate
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                    : "hidden"
                }`}
                onClick={handleConfirmAppointment}
                disabled={!selectedTime}
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
