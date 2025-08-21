"use client";

import { useContext, useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Stethoscope,
  DollarSign,
  Clock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LogoAndBack from "../../Components/LogoAndBack";
import axios from "axios";
import { DoctorDataContext } from "../../Context/DoctorContext";
import { setMaxAppointments } from "../../Utils/setMaxAppointments";

const DoctorSignup = () => {
  const navigate = useNavigate();
  const { doctor, setDoctor } = useContext(DoctorDataContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Professional Info
    specialization: "",
    experience: "",
    qualification: "",
    registrationNumber: "",

    // Practice Info
    clinicName: "",
    about: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    consultationFee: "",

    // Availability & Timing
    availableDays: [],
    clinicOpenTime: "",
    clinicCloseTime: "",
    appointmentsPerDay: "",
    avgAppointmentTime: "",
  });

  //Calculate maximum appointments per day

  useEffect(() => {
    if (
      formData.clinicOpenTime &&
      formData.clinicCloseTime &&
      formData.avgAppointmentTime
    ) {
      const calculatedAppointments = setMaxAppointments(
        formData.clinicOpenTime,
        formData.clinicCloseTime,
        formData.avgAppointmentTime
      );
      setFormData((prev) => ({
        ...prev,
        appointmentsPerDay: calculatedAppointments,
      }));
    }
  }, [formData.avgAppointmentTime]);

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

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Check if current step has any invalid fields
  const hasStepErrors = () => {
    if (currentStep === 1) {
      return (
        formData.firstName.length < 3 ||
        formData.lastName.length < 3 ||
        !formData.email.includes("@") ||
        formData.phone.length < 10 ||
        formData.password.length < 8 ||
        formData.confirmPassword !== formData.password ||
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phone ||
        !formData.password ||
        !formData.confirmPassword
      );
    }

    if (currentStep === 2) {
      return (
        !formData.specialization ||
        formData.experience < 1 ||
        formData.qualification.length < 2 ||
        formData.registrationNumber.length < 5 ||
        formData.clinicName.length < 3 ||
        formData.about.length < 10 ||
        formData.address.length < 10 ||
        formData.city.length < 2 ||
        formData.state.length < 2 ||
        formData.pincode.length !== 5 ||
        formData.consultationFee < 100 ||
        !formData.experience ||
        !formData.qualification ||
        !formData.registrationNumber ||
        !formData.clinicName ||
        !formData.about ||
        !formData.address ||
        !formData.city ||
        !formData.state ||
        !formData.pincode ||
        !formData.consultationFee
      );
    }

    if (currentStep === 3) {
      return (
        formData.availableDays.length === 0 ||
        !formData.clinicOpenTime ||
        !formData.clinicCloseTime ||
        formData.avgAppointmentTime < 5 ||
        !formData.avgAppointmentTime
      );
    }

    return false;
  };

  const handleInputChange = (e) => {
    //recive values from event.target
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDayToggle = (day) => {
    const updatedDays = formData.availableDays.includes(day)
      ? formData.availableDays.filter((d) => d !== day)
      : [...formData.availableDays, day];

    setFormData({
      ...formData,
      availableDays: updatedDays,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (formData.availableDays.length === 0) {
      alert("Please select available days!");
      return;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/doctors/register`,
      formData
    );
    if (response.status == "201") {
      const token = response.data.token;
      localStorage.setItem("token", token);
      const doctorDetails = response.data.doctor;
      setDoctor(doctorDetails);
      navigate("/doctor-dashboard");
    }
  };

  const nextStep = () => {
    if (hasStepErrors()) {
      alert("Please fill valid data in all fields of current section");
      return;
    }

    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border">
          {/* Header */}
          <div className="text-center mb-8">
            <LogoAndBack />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Join as Healthcare Provider
            </h2>
            <p className="text-gray-600">Create your professional profile</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <div
                className={`w-16 h-1 ${
                  currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 2
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <div
                className={`w-16 h-1 ${
                  currentStep >= 3 ? "bg-blue-600" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 3
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                3
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Personal Information
                </h3>

                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        minLength={3}
                        required
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                          formData.firstName && formData.firstName.length < 3
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="First name"
                      />
                    </div>
                    {formData.firstName && formData.firstName.length < 3 && (
                      <p className="text-red-500 text-sm mt-1">
                        First name must be at least 3 characters long
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        minLength={3}
                        required
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                          formData.lastName && formData.lastName.length < 3
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="Last name"
                      />
                    </div>
                    {formData.lastName && formData.lastName.length < 3 && (
                      <p className="text-red-500 text-sm mt-1">
                        Last name must be at least 3 characters long
                      </p>
                    )}
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                          formData.email && !formData.email.includes("@")
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="Enter your email"
                      />
                    </div>
                    {formData.email && !formData.email.includes("@") && (
                      <p className="text-red-500 text-sm mt-1">
                        Please enter a valid email address
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        minLength={10}
                        required
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                          formData.phone && formData.phone.length < 10
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {formData.phone && formData.phone.length < 10 && (
                      <p className="text-red-500 text-sm mt-1">
                        Phone number must be at least 10 digits
                      </p>
                    )}
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        minLength={8}
                        required
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 transition-colors ${
                          formData.password && formData.password.length < 8
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {formData.password && formData.password.length < 8 && (
                      <p className="text-red-500 text-sm mt-1">
                        Password must be at least 8 characters long
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 transition-colors ${
                          formData.confirmPassword &&
                          formData.confirmPassword !== formData.password
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {formData.confirmPassword &&
                      formData.confirmPassword !== formData.password && (
                        <p className="text-red-500 text-sm mt-1">
                          Passwords do not match
                        </p>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Professional Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Professional Information
                </h3>

                {/* Specialization & Experience */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialization
                    </label>
                    <div className="relative">
                      <Stethoscope className="absolute  left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="">Select specialization</option>
                        {specializations.map((spec) => (
                          <option key={spec} value={spec}>
                            {spec}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      min={1}
                      required
                      className={`w-full py-3 px-4 border rounded-lg focus:ring-2 transition-colors ${
                        formData.experience && formData.experience < 1
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="Years of experience"
                    />
                    {formData.experience && formData.experience < 1 && (
                      <p className="text-red-500 text-sm mt-1">
                        Experience must be at least 1 year
                      </p>
                    )}
                  </div>
                </div>

                {/* Qualification & Registration */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Qualification
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleInputChange}
                      minLength={2}
                      required
                      className={`w-full py-3 px-4 border rounded-lg focus:ring-2 transition-colors ${
                        formData.qualification &&
                        formData.qualification.length < 2
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="e.g., MBBS, MD"
                    />
                    {formData.qualification &&
                      formData.qualification.length < 2 && (
                        <p className="text-red-500 text-sm mt-1">
                          Qualification must be at least 2 characters long
                        </p>
                      )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medical Registration Number
                    </label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      minLength={5}
                      required
                      className={`w-full py-3 px-4 border rounded-lg focus:ring-2 transition-colors ${
                        formData.registrationNumber &&
                        formData.registrationNumber.length < 5
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="Registration number"
                    />
                    {formData.registrationNumber &&
                      formData.registrationNumber.length < 5 && (
                        <p className="text-red-500 text-sm mt-1">
                          Registration number must be at least 5 characters long
                        </p>
                      )}
                  </div>
                </div>

                {/* Clinic Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Clinic/Hospital Name
                  </label>
                  <input
                    type="text"
                    name="clinicName"
                    value={formData.clinicName}
                    onChange={handleInputChange}
                    minLength={3}
                    required
                    className={`w-full py-3 px-4 border rounded-lg focus:ring-2 transition-colors ${
                      formData.clinicName && formData.clinicName.length < 3
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder="Clinic or hospital name"
                  />
                  {formData.clinicName && formData.clinicName.length < 3 && (
                    <p className="text-red-500 text-sm mt-1">
                      Clinic name must be at least 3 characters long
                    </p>
                  )}
                </div>

                {/* About */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About
                  </label>
                  <input
                    type="text"
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    minLength={10}
                    required
                    className={`w-full py-3 px-4 border rounded-lg focus:ring-2 transition-colors ${
                      formData.about && formData.about.length < 10
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder="Tell About Your Self"
                  />
                  {formData.about && formData.about.length < 10 && (
                    <p className="text-red-500 text-sm mt-1">
                      About section must be at least 10 characters long
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      minLength={10}
                      rows="3"
                      required
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                        formData.address && formData.address.length < 10
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="Complete address"
                    />
                  </div>
                  {formData.address && formData.address.length < 10 && (
                    <p className="text-red-500 text-sm mt-1">
                      Address must be at least 10 characters long
                    </p>
                  )}
                </div>

                {/* City, State, Pincode */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      minLength={2}
                      required
                      className={`w-full py-3 px-4 border rounded-lg focus:ring-2 transition-colors ${
                        formData.city && formData.city.length < 2
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="City"
                    />
                    {formData.city && formData.city.length < 2 && (
                      <p className="text-red-500 text-sm mt-1">
                        City name must be at least 2 characters long
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      minLength={2}
                      required
                      className={`w-full py-3 px-4 border rounded-lg focus:ring-2 transition-colors ${
                        formData.state && formData.state.length < 2
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="State"
                    />
                    {formData.state && formData.state.length < 2 && (
                      <p className="text-red-500 text-sm mt-1">
                        State name must be at least 2 characters long
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      maxLength={5}
                      minLength={5}
                      required
                      className={`w-full py-3 px-4 border rounded-lg focus:ring-2 transition-colors ${
                        formData.pincode && formData.pincode.length !== 5
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="Pincode"
                    />
                    {formData.pincode && formData.pincode.length !== 5 && (
                      <p className="text-red-500 text-sm mt-1">
                        Pincode must be exactly 5 digits
                      </p>
                    )}
                  </div>
                </div>

                {/* Consultation Fee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Fee (PKR)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="consultationFee"
                      value={formData.consultationFee}
                      onChange={handleInputChange}
                      min={100}
                      required
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                        formData.consultationFee &&
                        formData.consultationFee < 100
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="Consultation fee"
                    />
                  </div>
                  {formData.consultationFee &&
                    formData.consultationFee < 100 && (
                      <p className="text-red-500 text-sm mt-1">
                        Consultation fee must be at least Rs. 100
                      </p>
                    )}
                </div>
              </div>
            )}

            {/* Step 3: Availability & Schedule */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Availability & Schedule
                </h3>

                {/* Available Days */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Available Days
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {daysOfWeek.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDayToggle(day)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          formData.availableDays.includes(day)
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                  {formData.availableDays.length === 0 && (
                    <p className="text-red-500 text-sm mt-1">
                      Please select at least one available day
                    </p>
                  )}
                </div>

                {/* Clinic Timing */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-600" />
                    Clinic Operating Hours
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Opening Time
                      </label>
                      <input
                        type="time"
                        name="clinicOpenTime"
                        value={formData.clinicOpenTime}
                        onChange={handleInputChange}
                        required
                        className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        When your clinic opens (first token time)
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Closing Time
                      </label>
                      <input
                        type="time"
                        name="clinicCloseTime"
                        value={formData.clinicCloseTime}
                        onChange={handleInputChange}
                        required
                        className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        When your clinic closes (last appointment)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Appointment Settings */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average Appointment Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        name="avgAppointmentTime"
                        value={formData.avgAppointmentTime}
                        onChange={handleInputChange}
                        min={5}
                        required
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                          formData.avgAppointmentTime &&
                          formData.avgAppointmentTime < 5
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="e.g., 15 minutes"
                      />
                    </div>
                    {formData.avgAppointmentTime &&
                      formData.avgAppointmentTime < 5 && (
                        <p className="text-red-500 text-sm mt-1">
                          Appointment time must be at least 10 minutes
                        </p>
                      )}
                    <p className="text-xs text-gray-500 mt-1">
                      Time allocated per patient consultation
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Appointments per Day
                    </label>
                    <input
                      type="number"
                      name="appointmentsPerDay"
                      value={formData.appointmentsPerDay}
                      onChange={handleInputChange}
                      min={1}
                      disabled
                      required
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-100"
                      placeholder="e.g., 20"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum patients you can see per day
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                >
                  Create Doctor Account
                </button>
              )}
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignup;
