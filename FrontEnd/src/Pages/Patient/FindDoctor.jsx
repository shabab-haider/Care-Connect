"use client";
import { useEffect, useState } from "react";
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
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";

const FindDoctor = () => {
  const [doctorsData, setDoctorsData] = useState([
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
      about:
        "Experienced cardiologist specializing in heart disease prevention and treatment.",
    },
  ]);
  useEffect(() => {
    const getDoctor = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/doctors/all`
      );
      console.log(response.data);
      setDoctorsData(response.data);
    };
    getDoctor();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Doctor specializations
  const specializations = [
    "General Physician",
    "Cardiologist",
    "Dermatologist",
    "Orthopedist",
    "Ophthalmologist",
    "ENT Specialist",
    "Gastroenterologist",
    "Psychiatrist",
    "Gynecologist",
    "Pediatrician",
    "Neurologist",
    "Urologist",
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
    setMinFee("");
    setMaxFee("");
  };

  // Doctor details modal
  const DoctorDetailsModal = ({ doctor, onClose }) => {
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
                  <div className="flex items-center text-gray-600">
                    <User className="h-4 w-4 mr-1" />
                    <span>
                      {doctor.professionalDetails.experience} years experience
                    </span>
                  </div>
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
                      (PKR){doctor.professionalDetails.consultationFee} consultation
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
              <Link
                to={`/appointment-booking/${doctor._id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-60 rounded-lg font-medium transition-colors"
              >
                Book Appointment
              </Link>
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

                {/* Fee Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Fee Range
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Min Fee (PKR)
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
                        Max Fee (PKR)
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
                        ? `(PKR)${minFee} - (PKR)${maxFee}`
                        : minFee
                        ? `(PKR)${minFee}+`
                        : maxFee
                        ? `Up to (PKR)${maxFee}`
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
              <div className="flex items-center justify-between mt-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredDoctors.length} Doctors Found
                </h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </button>
              </div>
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
                        </div>
                        <p className="text-blue-600 font-medium mb-2">
                          {doctor.professionalDetails.specialization}
                        </p>
                        <p className="text-gray-600 mb-3">
                          {doctor.professionalDetails.qualification}
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-4">
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

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-sm mb-3">
                          <div className="font-medium">
                            <span>Consultation fee:</span>
                          </div>
                          <div className="text-green-600 font-medium">
                            <span>
                              {doctor.professionalDetails.consultationFee} Rs
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
                        <Link
                          to={`/appointment-booking/${doctor._id}`}
                          className="bg-green-600 hover:bg-green-700 text-center text-white py-2 px-4 rounded-lg font-medium transition-colors"
                        >
                          Book Appointment
                        </Link>
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
      />
    </div>
  );
};

export default FindDoctor;
