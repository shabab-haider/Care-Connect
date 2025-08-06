"use client";
import { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  DollarSign,
  Calendar,
  CheckCircle,
  Stethoscope,
  User,
  SlidersHorizontal,
} from "lucide-react";
import LogoAndBack from "../../Components/LogoAndBack";

const FindDoctor = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Doctor specializations
  const specializations = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Neurology",
    "Obstetrics & Gynecology",
    "Oncology",
    "Pediatrics",
    "Psychiatry",
    "Surgery",
    "Other",
  ];

  // Sample doctor data matching your schema
  const doctorsData = [
    {
      _id: "1",
      fullName: "Dr. Sarah Johnson",
      email: "sarah.johnson@careconnect.com",
      profileImage: "/placeholder.svg?height=120&width=120",
      phone: "+1 (555) 987-6543",
      professionalDetails: {
        specialization: "Cardiology",
        experience: "12",
        qualification: "MBBS, MD Cardiology",
        registrationNumber: "MED12345",
        consultationFee: 800,
        avgAppointmentTime: 30,
      },
      clinicInfo: {
        clinicName: "Downtown Medical Center",
        address: "123 Medical St, Downtown",
        city: "New York",
        state: "New York",
        pincode: "10001",
        availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        clinicOpenTime: "09:00",
        clinicCloseTime: "17:00",
        appointmentsPerDay: 16,
      },
      rating: 4.9,
      reviews: 245,
      verified: true,
      availability: "Today",
      nextSlot: "2:30 PM",
      about:
        "Experienced cardiologist specializing in heart disease prevention and treatment.",
      languages: ["English", "Spanish"],
    },
    {
      _id: "2",
      fullName: "Dr. Michael Chen",
      email: "michael.chen@careconnect.com",
      profileImage: "/placeholder.svg?height=120&width=120",
      phone: "+1 (555) 456-7890",
      professionalDetails: {
        specialization: "Dermatology",
        experience: "8",
        qualification: "MBBS, MD Dermatology",
        registrationNumber: "MED23456",
        consultationFee: 600,
        avgAppointmentTime: 20,
      },
      clinicInfo: {
        clinicName: "Skin Care Clinic",
        address: "456 Health Ave, Midtown",
        city: "Los Angeles",
        state: "California",
        pincode: "90210",
        availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
        clinicOpenTime: "10:00",
        clinicCloseTime: "18:00",
        appointmentsPerDay: 20,
      },
      rating: 4.7,
      reviews: 189,
      verified: true,
      availability: "Tomorrow",
      nextSlot: "10:00 AM",
      about:
        "Specialist in skin disorders, acne treatment, and cosmetic dermatology.",
      languages: ["English", "Mandarin"],
    },
    {
      _id: "3",
      fullName: "Dr. Emily Davis",
      email: "emily.davis@careconnect.com",
      profileImage: "/placeholder.svg?height=120&width=120",
      phone: "+1 (555) 321-0987",
      professionalDetails: {
        specialization: "Pediatrics",
        experience: "15",
        qualification: "MBBS, MD Pediatrics",
        registrationNumber: "MED34567",
        consultationFee: 500,
        avgAppointmentTime: 25,
      },
      clinicInfo: {
        clinicName: "Children's Hospital",
        address: "789 Kids St, Uptown",
        city: "Chicago",
        state: "Illinois",
        pincode: "60601",
        availableDays: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        clinicOpenTime: "08:00",
        clinicCloseTime: "16:00",
        appointmentsPerDay: 18,
      },
      rating: 4.8,
      reviews: 312,
      verified: true,
      availability: "Today",
      nextSlot: "4:15 PM",
      about:
        "Dedicated pediatrician with expertise in child healthcare and development.",
      languages: ["English", "French"],
    },
    {
      _id: "4",
      fullName: "Dr. Robert Wilson",
      email: "robert.wilson@careconnect.com",
      profileImage: "/placeholder.svg?height=120&width=120",
      phone: "+1 (555) 654-3210",
      professionalDetails: {
        specialization: "Neurology",
        experience: "20",
        qualification: "MBBS, DM Neurology",
        registrationNumber: "MED45678",
        consultationFee: 1200,
        avgAppointmentTime: 45,
      },
      clinicInfo: {
        clinicName: "Brain & Spine Center",
        address: "321 Neuro Ave, Medical District",
        city: "Houston",
        state: "Texas",
        pincode: "77001",
        availableDays: ["Monday", "Tuesday", "Thursday", "Friday"],
        clinicOpenTime: "09:00",
        clinicCloseTime: "17:00",
        appointmentsPerDay: 12,
      },
      rating: 4.9,
      reviews: 428,
      verified: true,
      availability: "Next Week",
      nextSlot: "Mon 9:00 AM",
      about:
        "Leading neurologist specializing in brain disorders and neurological conditions.",
      languages: ["English"],
    },
    {
      _id: "5",
      fullName: "Dr. Lisa Anderson",
      email: "lisa.anderson@careconnect.com",
      profileImage: "/placeholder.svg?height=120&width=120",
      phone: "+1 (555) 789-0123",
      professionalDetails: {
        specialization: "Obstetrics & Gynecology",
        experience: "10",
        qualification: "MBBS, MS OBG",
        registrationNumber: "MED56789",
        consultationFee: 700,
        avgAppointmentTime: 30,
      },
      clinicInfo: {
        clinicName: "Women's Health Clinic",
        address: "654 Women St, Healthcare Plaza",
        city: "Phoenix",
        state: "Arizona",
        pincode: "85001",
        availableDays: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"],
        clinicOpenTime: "08:30",
        clinicCloseTime: "16:30",
        appointmentsPerDay: 15,
      },
      rating: 4.6,
      reviews: 156,
      verified: true,
      availability: "Tomorrow",
      nextSlot: "11:30 AM",
      about:
        "Experienced gynecologist providing comprehensive women's healthcare services.",
      languages: ["English", "Hindi"],
    },
    {
      _id: "6",
      fullName: "Dr. James Brown",
      email: "james.brown@careconnect.com",
      profileImage: "/placeholder.svg?height=120&width=120",
      phone: "+1 (555) 012-3456",
      professionalDetails: {
        specialization: "Gastroenterology",
        experience: "14",
        qualification: "MBBS, DM Gastroenterology",
        registrationNumber: "MED67890",
        consultationFee: 900,
        avgAppointmentTime: 35,
      },
      clinicInfo: {
        clinicName: "Digestive Care Center",
        address: "987 Gastro Blvd, Medical Complex",
        city: "Philadelphia",
        state: "Pennsylvania",
        pincode: "19101",
        availableDays: ["Monday", "Wednesday", "Thursday", "Friday"],
        clinicOpenTime: "10:00",
        clinicCloseTime: "18:00",
        appointmentsPerDay: 14,
      },
      rating: 4.5,
      reviews: 203,
      verified: true,
      availability: "Today",
      nextSlot: "3:45 PM",
      about:
        "Specialist in digestive system disorders and gastrointestinal diseases.",
      languages: ["English"],
    },
    {
      _id: "7",
      fullName: "Dr. Maria Garcia",
      email: "maria.garcia@careconnect.com",
      profileImage: "/placeholder.svg?height=120&width=120",
      phone: "+1 (555) 345-6789",
      professionalDetails: {
        specialization: "Endocrinology",
        experience: "9",
        qualification: "MBBS, DM Endocrinology",
        registrationNumber: "MED78901",
        consultationFee: 750,
        avgAppointmentTime: 30,
      },
      clinicInfo: {
        clinicName: "Hormone Health Center",
        address: "147 Endo St, Wellness District",
        city: "San Diego",
        state: "California",
        pincode: "92101",
        availableDays: [
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        clinicOpenTime: "09:00",
        clinicCloseTime: "17:00",
        appointmentsPerDay: 16,
      },
      rating: 4.7,
      reviews: 134,
      verified: true,
      availability: "Tomorrow",
      nextSlot: "2:00 PM",
      about:
        "Endocrinologist specializing in diabetes, thyroid, and hormonal disorders.",
      languages: ["English", "Spanish"],
    },
    {
      _id: "8",
      fullName: "Dr. David Lee",
      email: "david.lee@careconnect.com",
      profileImage: "/placeholder.svg?height=120&width=120",
      phone: "+1 (555) 567-8901",
      professionalDetails: {
        specialization: "Psychiatry",
        experience: "11",
        qualification: "MBBS, MD Psychiatry",
        registrationNumber: "MED89012",
        consultationFee: 650,
        avgAppointmentTime: 50,
      },
      clinicInfo: {
        clinicName: "Mental Health Clinic",
        address: "258 Mind St, Therapy Plaza",
        city: "Dallas",
        state: "Texas",
        pincode: "75201",
        availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        clinicOpenTime: "09:00",
        clinicCloseTime: "17:00",
        appointmentsPerDay: 10,
      },
      rating: 4.8,
      reviews: 267,
      verified: true,
      availability: "Today",
      nextSlot: "5:30 PM",
      about:
        "Psychiatrist specializing in mental health, anxiety, and depression treatment.",
      languages: ["English", "Korean"],
    },
  ];

  // Filter doctors based on search criteria
  const getFilteredDoctors = () => {
    let filtered = doctorsData;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((doctor) => {
        return (
          doctor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.professionalDetails.specialization
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          doctor.clinicInfo.clinicName
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      });
    }

    // Specialization filter
    if (selectedSpecialization) {
      filtered = filtered.filter((doctor) => {
        return (
          doctor.professionalDetails.specialization === selectedSpecialization
        );
      });
    }

    // City filter
    if (cityFilter) {
      filtered = filtered.filter((doctor) => {
        return doctor.clinicInfo.city
          .toLowerCase()
          .includes(cityFilter.toLowerCase());
      });
    }

    // Availability filter
    if (selectedAvailability) {
      filtered = filtered.filter((doctor) => {
        return doctor.availability === selectedAvailability;
      });
    }

    // Fee filter
    if (minFee) {
      filtered = filtered.filter((doctor) => {
        return doctor.professionalDetails.consultationFee >= parseInt(minFee);
      });
    }

    if (maxFee) {
      filtered = filtered.filter((doctor) => {
        return doctor.professionalDetails.consultationFee <= parseInt(maxFee);
      });
    }

    return filtered;
  };

  const filteredDoctors = getFilteredDoctors();

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSpecialization("");
    setCityFilter("");
    setSelectedAvailability("");
    setMinFee("");
    setMaxFee("");
  };

  // Doctor details modal
  const DoctorDetailsModal = ({ doctor, onClose, onBookAppointment }) => {
    if (!doctor) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Doctor Details
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
            {/* Doctor Info */}
            <div className="flex flex-col sm:flex-row gap-6">
              <img
                src={doctor.profileImage || "/placeholder.svg"}
                alt={doctor.fullName}
                className="w-32 h-32 rounded-xl object-cover mx-auto sm:mx-0"
              />
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {doctor.fullName}
                  </h3>
                  {doctor.verified && (
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  )}
                </div>
                <p className="text-blue-600 font-medium mb-2">
                  {doctor.professionalDetails.specialization}
                </p>
                <p className="text-gray-600 mb-2">
                  {doctor.professionalDetails.qualification}
                </p>
                <p className="text-gray-600 mb-2">
                  Reg. No: {doctor.professionalDetails.registrationNumber}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-gray-500 ml-1">
                      ({doctor.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="h-4 w-4 mr-1" />
                    <span>
                      {doctor.professionalDetails.experience} years exp
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {doctor.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* About */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">About</h4>
              <p className="text-gray-700">{doctor.about}</p>
            </div>

            {/* Clinic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Clinic Information
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-1" />
                    <div>
                      <p className="font-medium">
                        {doctor.clinicInfo.clinicName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {doctor.clinicInfo.address}
                      </p>
                      <p className="text-sm text-gray-600">
                        {doctor.clinicInfo.city}, {doctor.clinicInfo.state} -{" "}
                        {doctor.clinicInfo.pincode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span>
                      {doctor.clinicInfo.clinicOpenTime} -{" "}
                      {doctor.clinicInfo.clinicCloseTime}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Appointment Info
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                    <span>
                      ₹{doctor.professionalDetails.consultationFee} consultation
                      fee
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span>
                      {doctor.professionalDetails.avgAppointmentTime} mins per
                      appointment
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span>Available {doctor.availability}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span>Next slot: {doctor.nextSlot}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Available Days:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {doctor.clinicInfo.availableDays.map((day, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                      >
                        {day.slice(0, 3)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <button
                onClick={() => onBookAppointment(doctor)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleBookAppointment = (doctor) => {
    alert(
      `Booking appointment with ${doctor.fullName} - Replace with actual booking flow`
    );
    setSelectedDoctor(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-6 py-2 bg-white shadow-sm border-b sticky top-0 z-40">
        <LogoAndBack />
        <div className="flex items-center justify-between mt-2">
          <h1 className="text-xl font-bold text-gray-900">Find Doctors</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div
            className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search doctors, clinics, specializations..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Specialization */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization
                  </label>
                  <select
                    value={selectedSpecialization}
                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                    className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Specializations</option>
                    {specializations.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={cityFilter}
                      onChange={(e) => setCityFilter(e.target.value)}
                      placeholder="Enter city name..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <select
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                    className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Any Time</option>
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="Next Week">Next Week</option>
                  </select>
                </div>

                {/* Fee Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Fee Range
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Min Fee (Rs)
                      </label>
                      <input
                        type="number"
                        value={minFee}
                        onChange={(e) => setMinFee(e.target.value)}
                        placeholder="0"
                        min="0"
                        className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Max Fee (Rs)
                      </label>
                      <input
                        type="number"
                        value={maxFee}
                        onChange={(e) => setMaxFee(e.target.value)}
                        placeholder="2000"
                        min="0"
                        className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  {(minFee || maxFee) && (
                    <p className="text-xs text-gray-500 mt-1">
                      {minFee && maxFee
                        ? `₹${minFee} - ₹${maxFee}`
                        : minFee
                        ? `₹${minFee}+`
                        : maxFee
                        ? `Up to ₹${maxFee}`
                        : ""}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredDoctors.length} Doctors Found
              </h2>
              <p className="text-gray-600">
                {selectedSpecialization &&
                  `Specializing in ${selectedSpecialization}`}
                {cityFilter && ` in ${cityFilter}`}
              </p>
            </div>

            {/* Doctor Cards */}
            <div className="space-y-4">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <div
                    key={doctor._id}
                    className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Doctor Image */}
                      <div className="flex-shrink-0 mx-auto lg:mx-0">
                        <img
                          src={doctor.profileImage || "/placeholder.svg"}
                          alt={doctor.fullName}
                          className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover"
                        />
                      </div>

                      {/* Doctor Info */}
                      <div className="flex-1 text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {doctor.fullName}
                          </h3>
                          {doctor.verified && (
                            <CheckCircle className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <p className="text-blue-600 font-medium mb-2">
                          {doctor.professionalDetails.specialization}
                        </p>
                        <p className="text-gray-600 mb-3">
                          {doctor.professionalDetails.qualification}
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="font-medium">{doctor.rating}</span>
                            <span className="text-gray-500 ml-1">
                              ({doctor.reviews})
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Stethoscope className="h-4 w-4 mr-1" />
                            <span>
                              {doctor.professionalDetails.experience} years
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="truncate max-w-[200px]">
                              {doctor.clinicInfo.city},{" "}
                              {doctor.clinicInfo.state}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm mb-3">
                          <div className="flex items-center text-green-600">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Available {doctor.availability}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Next: {doctor.nextSlot}</span>
                          </div>
                          <div className="flex items-center text-purple-600 font-medium">
                            <DollarSign className="h-4 w-4 mr-1" />
                            <span>
                              ₹{doctor.professionalDetails.consultationFee}
                            </span>
                          </div>
                        </div>

                        <div className="text-center lg:text-left">
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">
                              {doctor.clinicInfo.clinicName}
                            </span>{" "}
                            • {doctor.professionalDetails.avgAppointmentTime}{" "}
                            mins appointment
                          </p>
                          <div className="flex flex-wrap gap-1 justify-center lg:justify-start">
                            {doctor.clinicInfo.availableDays
                              .slice(0, 3)
                              .map((day, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                                >
                                  {day.slice(0, 3)}
                                </span>
                              ))}
                            {doctor.clinicInfo.availableDays.length > 3 && (
                              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                +{doctor.clinicInfo.availableDays.length - 3}{" "}
                                more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3 lg:w-48">
                        <button
                          onClick={() => setSelectedDoctor(doctor)}
                          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() => handleBookAppointment(doctor)}
                          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                        >
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Stethoscope className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    No doctors found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Details Modal */}
      <DoctorDetailsModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        onBookAppointment={handleBookAppointment}
      />
    </div>
  );
};

export default FindDoctor;
