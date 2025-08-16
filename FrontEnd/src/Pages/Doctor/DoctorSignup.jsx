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

  // Field validation rules
  const fieldRules = {
    firstName: {
      required: true,
      minLength: 3,
      message: "First name must be at least 3 characters long",
    },
    lastName: {
      required: true,
      minLength: 3,
      message: "Last name must be at least 3 characters long",
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
    phone: {
      required: true,
      minLength: 10,
      message: "Phone number must be at least 10 digits",
    },
    password: {
      required: true,
      minLength: 8,
      message: "Password must be at least 8 characters long",
    },
    confirmPassword: {
      required: true,
      match: "password",
      message: "Passwords do not match",
    },
    specialization: {
      required: true,
      message: "Please select a specialization",
    },
    experience: {
      required: true,
      min: 1,
      message: "Experience must be at least 1 year",
    },
    qualification: {
      required: true,
      minLength: 2,
      message: "Qualification must be at least 2 characters long",
    },
    registrationNumber: {
      required: true,
      minLength: 5,
      message: "Registration number must be at least 5 characters long",
    },
    clinicName: {
      required: true,
      minLength: 3,
      message: "Clinic name must be at least 3 characters long",
    },
    about: {
      required: true,
      minLength: 10,
      message: "About section must be at least 10 characters long",
    },
    address: {
      required: true,
      minLength: 10,
      message: "Address must be at least 10 characters long",
    },
    city: {
      required: true,
      minLength: 2,
      message: "City name must be at least 2 characters long",
    },
    state: {
      required: true,
      minLength: 2,
      message: "State name must be at least 2 characters long",
    },
    pincode: {
      required: true,
      exactLength: 5,
      message: "Pincode must be exactly 6 digits",
    },
    consultationFee: {
      required: true,
      minLength: 1,
      message: "Consultation fee is required",
    },
    clinicOpenTime: { required: true, message: "Please select opening time" },
    clinicCloseTime: { required: true, message: "Please select closing time" },
    avgAppointmentTime: {
      required: true,
      min: 5,
      message: "Appointment time must be at least 5 minutes",
    },
  };

  // Check if field is valid
  const isFieldValid = (fieldName, value) => {
    const rules = fieldRules[fieldName];
    if (!rules) return true;

    if (rules.required && (!value || value === "")) return false;
    if (rules.minLength && value.length < rules.minLength) return false;
    if (rules.exactLength && value.length !== rules.exactLength) return false;
    if (rules.min && Number(value) < rules.min) return false;
    if (rules.pattern && !rules.pattern.test(value)) return false;
    if (rules.match && value !== formData[rules.match]) return false;

    return true;
  };

  // Get error message for field
  const getFieldError = (fieldName, value) => {
    const rules = fieldRules[fieldName];
    if (!rules) return "";

    if (!isFieldValid(fieldName, value)) {
      return rules.message;
    }
    return "";
  };

  // Get input styling based on validation
  const getInputStyling = (
    fieldName,
    value,
    hasIcon = false,
    isPassword = false
  ) =>
  {
    const baseClass = hasIcon
      ? "w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors"
      : "w-full py-3 px-4 border rounded-lg focus:ring-2 transition-colors";

    const passwordClass = isPassword
      ? "w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 transition-colors"
      : baseClass;

    const finalBaseClass = isPassword ? passwordClass : baseClass;

    if (value && !isFieldValid(fieldName, value)) {
      return `${finalBaseClass} border-red-500 focus:ring-red-500 focus:border-red-500`;
    }
    return `${finalBaseClass} border-gray-300 focus:ring-blue-500 focus:border-blue-500`;
  };

  // Check if current step has any invalid fields
  const hasStepErrors = () => {
    let stepFields = [];

    if (currentStep === 1) {
      stepFields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "password",
        "confirmPassword",
      ];
    } else if (currentStep === 2) {
      stepFields = [
        "specialization",
        "experience",
        "qualification",
        "registrationNumber",
        "clinicName",
        "about",
        "address",
        "city",
        "state",
        "pincode",
        "consultationFee",
      ];
    } else if (currentStep === 3) {
      stepFields = ["clinicOpenTime", "clinicCloseTime", "avgAppointmentTime"];
      // Check available days separately
      if (formData.availableDays.length === 0) return true;
    }

    return stepFields.some((field) => !isFieldValid(field, formData[field]));
  };

  const handleInputChange = (e) => {
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
                        className={getInputStyling(
                          "firstName",
                          formData.firstName,
                          true
                        )}
                        placeholder="First name"
                        required
                      />
                    </div>
                    {formData.firstName &&
                      !isFieldValid("firstName", formData.firstName) && (
                        <p className="text-red-500 text-sm mt-1">
                          {getFieldError("firstName", formData.firstName)}
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
                        className={getInputStyling(
                          "lastName",
                          formData.lastName,
                          true
                        )}
                        placeholder="Last name"
                        required
                      />
                    </div>
                    {formData.lastName &&
                      !isFieldValid("lastName", formData.lastName) && (
                        <p className="text-red-500 text-sm mt-1">
                          {getFieldError("lastName", formData.lastName)}
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
                        className={getInputStyling(
                          "email",
                          formData.email,
                          true
                        )}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    {formData.email &&
                      !isFieldValid("email", formData.email) && (
                        <p className="text-red-500 text-sm mt-1">
                          {getFieldError("email", formData.email)}
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
                        className={getInputStyling(
                          "phone",
                          formData.phone,
                          true
                        )}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    {formData.phone &&
                      !isFieldValid("phone", formData.phone) && (
                        <p className="text-red-500 text-sm mt-1">
                          {getFieldError("phone", formData.phone)}
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
                        className={getInputStyling(
                          "password",
                          formData.password,
                          false,
                          true
                        )}
                        placeholder="Create a password"
                        required
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
                    {formData.password &&
                      !isFieldValid("password", formData.password) && (
                        <p className="text-red-500 text-sm mt-1">
                          {getFieldError("password", formData.password)}
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
                        className={getInputStyling(
                          "confirmPassword",
                          formData.confirmPassword,
                          false,
                          true
                        )}
                        placeholder="Confirm your password"
                        required
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
                      !isFieldValid(
                        "confirmPassword",
                        formData.confirmPassword
                      ) && (
                        <p className="text-red-500 text-sm mt-1">
                          {getFieldError(
                            "confirmPassword",
                            formData.confirmPassword
                          )}
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
                        className={getInputStyling(
                          "specialization",
                          formData.specialization,
                          true
                        )}
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
                    {formData.specialization &&
                      !isFieldValid(
                        "specialization",
                        formData.specialization
                      ) && (
                        <p className="text-red-500 text-sm mt-1">
                          {getFieldError(
                            "specialization",
                            formData.specialization
                          )}
                        </p>
                      )}
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
                      className={getInputStyling(
                        "experience",
                        formData.experience
                      )}
                      placeholder="Years of experience"
                      min="1"
                      required
                    />
                    {formData.experience &&
                      !isFieldValid("experience", formData.experience) && (
                        <p className="text-red-500 text-sm mt-1">
                          {getFieldError("experience", formData.experience)}
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
                      className={getInputStyling(
                        "qualification",
                        formData.qualification
                      )}
                      placeholder="e.g., MBBS, MD"
                      required
                    />
                    {formData.qualification &&
                      !isFieldValid(
                        "qualification",
                        formData.qualification
                      ) && (
                        <p className="text-red-500 text-sm mt-1">
                          {getFieldError(
                            "qualification",
                            formData.qualification
                          )}
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
                      className={getInputStyling(
                        "registrationNumber",
                        formData.registrationNumber
                      )}
                      placeholder="Registration number"
                      required
                    />
                    {formData.registrationNumber &&
                      !isFieldValid(
                        "registrationNumber",
                        formData.registrationNumber
                      ) && (
                        <p className="text-red-500 text-sm mt-1">
                          {getFieldError(
                            "registrationNumber",
                            formData.registrationNumber
                          )}
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
                    className={getInputStyling(
                      "clinicName",
                      formData.clinicName
                    )}
                    placeholder="Clinic or hospital name"
                    required
                  />
                  {formData.clinicName &&
                    !isFieldValid("clinicName", formData.clinicName) && (
                      <p className="text-red-500 text-sm mt-1">
                        {getFieldError("clinicName", formData.clinicName)}
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
                    className={getInputStyling("about", formData.about)}
                    placeholder="Tell About Your Self"
                    required
                  />
                  {formData.about && !isFieldValid("about", formData.about) && (
                    <p className="text-red-500 text-sm mt-1">
                      {getFieldError("about", formData.about)}
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
                      rows="3"
                      className={getInputStyling(
                        "address",
                        formData.address,
                        true
                      )}
                      placeholder="Complete address"
                      required
                    />
                  </div>
                  {formData.address &&
                    !isFieldValid("address", formData.address) && (
                      <p className="text-red-500 text-sm mt-1">
                        {getFieldError("address", formData.address)}
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
                      className={getInputStyling("city", formData.city)}
                      placeholder="City"
                      required
                    />
                    {formData.city && !isFieldValid("city", formData.city) && (
                      <p className="text-red-500 text-sm mt-1">
                        {getFieldError("city", formData.city)}
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
                      className={getInputStyling("state", formData.state)}
                      placeholder="State"
                      required
                    />
                    {formData.state &&
                      !isFieldValid("state", formData.state) && (
                        <p className="text-red-500 text-sm mt-1">
                          {getFieldError("state", formData.state)}
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
                      className={getInputStyling("pincode", formData.pincode)}
                      placeholder="Pincode"
                      required
                    />
                    {formData.pincode &&
                      !isFieldValid("pincode", formData.pincode) && (
                        <p className="text-red-500 text-sm mt-1">
                          {getFieldError("pincode", formData.pincode)}
                        </p>
                      )}
                  </div>
                </div>

                {/* Consultation Fee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Fee (Rs)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="consultationFee"
                      value={formData.consultationFee}
                      onChange={handleInputChange}
                      className={getInputStyling(
                        "consultationFee",
                        formData.consultationFee,
                        true
                      )}
                      placeholder="Consultation fee"
                      min="100"
                      required
                    />
                  </div>
                  {formData.consultationFee &&
                    !isFieldValid(
                      "consultationFee",
                      formData.consultationFee
                    ) && (
                      <p className="text-red-500 text-sm mt-1">
                        {getFieldError(
                          "consultationFee",
                          formData.consultationFee
                        )}
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
                        className={getInputStyling(
                          "clinicOpenTime",
                          formData.clinicOpenTime
                        )}
                        required
                      />
                      {formData.clinicOpenTime &&
                        !isFieldValid(
                          "clinicOpenTime",
                          formData.clinicOpenTime
                        ) && (
                          <p className="text-red-500 text-sm mt-1">
                            {getFieldError(
                              "clinicOpenTime",
                              formData.clinicOpenTime
                            )}
                          </p>
                        )}
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
                        className={getInputStyling(
                          "clinicCloseTime",
                          formData.clinicCloseTime
                        )}
                        required
                      />
                      {formData.clinicCloseTime &&
                        !isFieldValid(
                          "clinicCloseTime",
                          formData.clinicCloseTime
                        ) && (
                          <p className="text-red-500 text-sm mt-1">
                            {getFieldError(
                              "clinicCloseTime",
                              formData.clinicCloseTime
                            )}
                          </p>
                        )}
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
                        className={getInputStyling(
                          "avgAppointmentTime",
                          formData.avgAppointmentTime,
                          true
                        )}
                        placeholder="e.g., 15 minutes"
                        min="10"
                        required
                      />
                    </div>
                    {formData.avgAppointmentTime &&
                      !isFieldValid(
                        "avgAppointmentTime",
                        formData.avgAppointmentTime
                      ) && (
                        <p className="text-red-500 text-sm mt-1">
                          {getFieldError(
                            "avgAppointmentTime",
                            formData.avgAppointmentTime
                          )}
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
                      className={getInputStyling(
                        "appointmentsPerDay",
                        formData.appointmentsPerDay
                      )}
                      placeholder="e.g., 20"
                      min="1"
                      disabled
                      required
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
