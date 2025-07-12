"use client"

import { useState } from "react"
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
  Heart,
  ArrowLeft,
} from "lucide-react"
import { Link } from "react-router-dom"

const DoctorSignup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
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
    breakStartTime: "",
    breakEndTime: "",
    hasBreak: false,

    agreeToTerms: false,
  })

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
  ]

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleDayToggle = (day) => {
    const updatedDays = formData.availableDays.includes(day)
      ? formData.availableDays.filter((d) => d !== day)
      : [...formData.availableDays, day]

    setFormData({
      ...formData,
      availableDays: updatedDays,
    })
  }

  // Calculate estimated appointment times
  const calculateAppointmentSchedule = () => {
    if (!formData.clinicOpenTime || !formData.clinicCloseTime || !formData.avgAppointmentTime) {
      return null
    }

    const openTime = new Date(`2024-01-01 ${formData.clinicOpenTime}`)
    const closeTime = new Date(`2024-01-01 ${formData.clinicCloseTime}`)
    const appointmentDuration = Number.parseInt(formData.avgAppointmentTime)

    let breakDuration = 0
    if (formData.hasBreak && formData.breakStartTime && formData.breakEndTime) {
      const breakStart = new Date(`2024-01-01 ${formData.breakStartTime}`)
      const breakEnd = new Date(`2024-01-01 ${formData.breakEndTime}`)
      breakDuration = (breakEnd - breakStart) / (1000 * 60) // in minutes
    }

    const totalWorkingMinutes = (closeTime - openTime) / (1000 * 60) - breakDuration
    const maxAppointments = Math.floor(totalWorkingMinutes / appointmentDuration)

    return {
      firstAppointment: formData.clinicOpenTime,
      lastAppointment: new Date(closeTime.getTime() - appointmentDuration * 60000).toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
      maxAppointments,
      totalWorkingHours: Math.floor(totalWorkingMinutes / 60),
    }
  }

  const scheduleInfo = calculateAppointmentSchedule()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    console.log("Doctor signup:", formData)
    // Handle signup logic here
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back to Home */}
        <div className="mb-6">
          <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-blue-600">Care Connect</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Join as Healthcare Provider</h2>
            <p className="text-gray-600">Create your professional profile</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
              >
                1
              </div>
              <div className={`w-16 h-1 ${currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
              >
                2
              </div>
              <div className={`w-16 h-1 ${currentStep >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
              >
                3
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>

                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="First name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Create a password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Professional Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Information</h3>

                {/* Specialization & Experience */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                    <div className="relative">
                      <Stethoscope className="absolute  left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Years of experience"
                      min="0"
                      required
                    />
                  </div>
                </div>

                {/* Qualification & Registration */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                    <input
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleInputChange}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="e.g., MBBS, MD"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medical Registration Number</label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Registration number"
                      required
                    />
                  </div>
                </div>

                {/* Clinic Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Clinic/Hospital Name</label>
                  <input
                    type="text"
                    name="clinicName"
                    value={formData.clinicName}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Clinic or hospital name"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Complete address"
                      required
                    />
                  </div>
                </div>

                {/* City, State, Pincode */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="City"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="State"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Pincode"
                      required
                    />
                  </div>
                </div>

                {/* Consultation Fee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee (₹)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="consultationFee"
                      value={formData.consultationFee}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Consultation fee"
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Availability & Schedule */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Availability & Schedule</h3>

                {/* Available Days */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Available Days</label>
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
                </div>

                {/* Clinic Timing */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-600" />
                    Clinic Operating Hours
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Opening Time</label>
                      <input
                        type="time"
                        name="clinicOpenTime"
                        value={formData.clinicOpenTime}
                        onChange={handleInputChange}
                        className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">When your clinic opens (first token time)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Closing Time</label>
                      <input
                        type="time"
                        name="clinicCloseTime"
                        value={formData.clinicCloseTime}
                        onChange={handleInputChange}
                        className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">When your clinic closes (last appointment)</p>
                    </div>
                  </div>
                </div>

               

                {/* Appointment Settings */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Average Appointment Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        name="avgAppointmentTime"
                        value={formData.avgAppointmentTime}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      >
                        <option value="">Select duration</option>
                        <option value="10">10 minutes</option>
                        <option value="15">15 minutes</option>
                        <option value="20">20 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">60 minutes</option>
                      </select>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Time allocated per patient consultation</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Appointments per Day</label>
                    <input
                      type="number"
                      name="appointmentsPerDay"
                      value={formData.appointmentsPerDay}
                      onChange={handleInputChange}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="e.g., 20"
                      min="1"
                      max="50"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Maximum patients you can see per day</p>
                  </div>
                </div>

                {/* Schedule Preview */}
                {scheduleInfo && (
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-green-600" />
                      Schedule Preview
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-700">
                          <span className="font-medium">First Token Time:</span> {scheduleInfo.firstAppointment}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Last Token Time:</span> {scheduleInfo.lastAppointment}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-700">
                          <span className="font-medium">Max Appointments:</span> {scheduleInfo.maxAppointments} per day
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Working Hours:</span> {scheduleInfo.totalWorkingHours} hours
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-green-100 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>Patient Experience:</strong> Patients will see estimated appointment times like "10:30
                        AM - 10:45 AM" when booking with you.
                      </p>
                    </div>
                  </div>
                )}

                
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
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorSignup
