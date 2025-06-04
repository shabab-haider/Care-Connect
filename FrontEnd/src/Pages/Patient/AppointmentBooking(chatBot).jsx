import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Components/Logo";
import Avatar from "../../Components/Avatar";
import PatientHeader from "../../Components/PatientHeader";

const AppointmentBooking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState({
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: 15,
    rating: 4.8,
    image: "/placeholder.svg",
  });
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 1, 15)); // February 15, 2024
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 1)); // February 2024

  // Mock data for doctors
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      experience: 15,
      rating: 4.8,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurologist",
      experience: 12,
      rating: 4.9,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Dr. Emily Williams",
      specialty: "Pediatrician",
      experience: 10,
      rating: 4.7,
      image: "/placeholder.svg",
    },
  ];

  // Mock data for available time slots
  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Handle doctor selection
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setCurrentStep(2);
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  // Handle confirm appointment
  const handleConfirmAppointment = () => {
    // In a real app, this would submit the appointment to the backend
    console.log("Appointment confirmed:", {
      selectedDoctor,
      selectedDate,
      selectedTime,
    });
    setCurrentStep(3);
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", {
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

  // Get day of week headers
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Filter doctors based on search query
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <PatientHeader />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="h-[88vh] w-screen flex flex-col md:flex-row gap-8">
          {/* Left Column - Doctor Selection */}
          <div className="h-full  w-[50vw] bg-red md:w-1/2">
            {/* Search Bar - visible on all screens */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search doctors by name or specialty"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Doctor List */}
            <div className="space-y-4">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <img
                        src={doctor.image || "/placeholder.svg"}
                        alt={doctor.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h3 className="text-base font-semibold">
                          {doctor.name}
                        </h3>
                        <p className="text-blue-500 text-sm">
                          {doctor.specialty}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {doctor.experience} years experience
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 ${
                            i < Math.floor(doctor.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-gray-600 text-sm">
                        {doctor.rating}
                      </span>
                    </div>
                  </div>
                  <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 text-sm font-medium transition duration-200"
                    onClick={() => handleDoctorSelect(doctor)}
                  >
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Date & Time Selection */}
          <div className="h-full overflow-auto w-[50vw] md:w-1/2">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Select Date & Time</h2>

              {/* Month Navigation */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-medium">
                  {new Intl.DateTimeFormat("en-US", {
                    month: "long",
                    year: "numeric",
                  }).format(currentMonth)}
                </h3>
                <div className="flex space-x-2">
                  <button
                    className="p-1 rounded hover:bg-gray-100"
                    onClick={goToPreviousMonth}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    className="p-1 rounded hover:bg-gray-100"
                    onClick={goToNextMonth}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Calendar */}
              <div className="mb-6">
                {/* Days of Week */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {daysOfWeek.map((day) => (
                    <div
                      key={day}
                      className="text-center text-xs text-gray-500 py-1"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((date, index) => (
                    <button
                      key={index}
                      className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center text-sm ${
                        isDateSelected(date)
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                      onClick={() => handleDateSelect(date)}
                    >
                      {date.getDate()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <h3 className="text-base font-medium mb-4">
                Available Time Slots
              </h3>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    className={`py-2 px-1 rounded text-center text-sm ${
                      isTimeSelected(time)
                        ? "bg-blue-500 text-white"
                        : "border border-gray-300 hover:border-blue-500 text-gray-700"
                    }`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {/* Selected Appointment Details */}
              <div className="mt-8 border-t pt-6">
                <h3 className="text-base font-medium mb-4">
                  Selected Appointment Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-sm">
                      {selectedDoctor.name} - {selectedDoctor.specialty}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm">{formatDate(selectedDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500 mr-3"
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
                    <span className="text-sm">{selectedTime}</span>
                  </div>
                </div>

                <button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded text-sm font-medium transition duration-200 mt-6"
                  onClick={handleConfirmAppointment}
                >
                  Confirm Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
