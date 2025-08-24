import { useState, useRef, useEffect, useContext } from "react";
import {
  User,
  Phone,
  Camera,
  Save,
  ArrowLeft,
  Clock,
  Stethoscope,
  DollarSign,
  Building,
  Upload,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import { setMaxAppointments } from "../../Utils/setMaxAppointments";
import { toast } from "react-toastify";
import { DoctorDataContext } from "../../Context/DoctorContext";
import axios from "axios";

const DoctorProfile = () => {
  const fileInputRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const { doctor, setDoctor } = useContext(DoctorDataContext);
  const id = doctor._id;

  // Doctor profile data state
  const [doctorData, setDoctorData] = useState({
    fullName: doctor.fullName,
    phone: doctor.phone,
    profileImage: doctor.profileImage,
    about: doctor.about,

    professionalDetails: {
      experience: doctor.professionalDetails.experience,
      consultationFee: doctor.professionalDetails.consultationFee,
      avgAppointmentTime: doctor.professionalDetails.avgAppointmentTime,
    },

    clinicInfo: {
      availableDays: doctor.clinicInfo.availableDays,
      clinicOpenTime: doctor.clinicInfo.clinicOpenTime,
      clinicCloseTime: doctor.clinicInfo.clinicCloseTime,
      appointmentsPerDay: doctor.clinicInfo.appointmentsPerDay, // This will be calculated automatically
    },
  });

  // Calculate maximum appointments per day using the provided utility function
  useEffect(() => {
    if (
      doctorData.clinicInfo.clinicOpenTime &&
      doctorData.clinicInfo.clinicCloseTime &&
      doctorData.professionalDetails.avgAppointmentTime
    ) {
      const calculatedAppointments = setMaxAppointments(
        doctorData.clinicInfo.clinicOpenTime,
        doctorData.clinicInfo.clinicCloseTime,
        doctorData.professionalDetails.avgAppointmentTime
      );
      setDoctorData((prev) => ({
        ...prev,
        clinicInfo: {
          ...prev.clinicInfo,
          appointmentsPerDay: calculatedAppointments,
        },
      }));
    }
  }, [
    doctorData.clinicInfo.clinicOpenTime,
    doctorData.clinicInfo.clinicCloseTime,
    doctorData.professionalDetails.avgAppointmentTime,
  ]);

  const handleInputChange = (section, field, value) => {
    if (section) {
      setDoctorData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    } else {
      setDoctorData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleDayToggle = (day) => {
    const currentDays = doctorData.clinicInfo.availableDays;
    const updatedDays = currentDays.includes(day)
      ? currentDays.filter((d) => d !== day)
      : [...currentDays, day];

    handleInputChange("clinicInfo", "availableDays", updatedDays);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Care_Connect");
    formData.append("cloud_name", "di9ljccil");
    console.log("Uploading image...");
    toast.promise(
      fetch("https://api.cloudinary.com/v1_1/di9ljccil/image/upload", {
        method: "POST",
        body: formData,
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error("Upload Upload failed");
        }
        const uploadedImage = await res.json();
        setDoctorData((prev) => ({
          ...prev,
          profileImage: uploadedImage.url,
        }));
        console.log("Upload complete ✅");
      }),
      {
        pending: "Uploading...",
        success: "uploaded successfully!",
        error: "Failed to upload",
      }
    );
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic validation
    if (!doctorData.fullName || doctorData.fullName.length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
    }
    if (!doctorData.phone) {
      newErrors.phone = "Phone number is required";
    }

    // Professional details validation
    if (!doctorData.professionalDetails.experience) {
      newErrors.experience = "Experience is required";
    }
    if (!doctorData.professionalDetails.consultationFee) {
      newErrors.consultationFee = "Consultation fee is required";
    }
    if (!doctorData.professionalDetails.avgAppointmentTime) {
      newErrors.avgAppointmentTime = "Average appointment time is required";
    }

    // Clinic info validation
    if (!doctorData.clinicInfo.availableDays.length) {
      newErrors.availableDays = "At least one available day is required";
    }
    if (!doctorData.clinicInfo.clinicOpenTime) {
      newErrors.clinicOpenTime = "Opening time is required";
    }
    if (!doctorData.clinicInfo.clinicCloseTime) {
      newErrors.clinicCloseTime = "Closing time is required";
    }

    // Validate that closing time is after opening time
    if (
      doctorData.clinicInfo.clinicOpenTime &&
      doctorData.clinicInfo.clinicCloseTime
    ) {
      if (
        doctorData.clinicInfo.clinicCloseTime <=
        doctorData.clinicInfo.clinicOpenTime
      ) {
        newErrors.clinicCloseTime = "Closing time must be after opening time";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const data = doctorData;
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/doctors/:${id}/update`,
        { data }
      );
      console.log(response.data.doctor);
      setDoctor(response.data.doctor);
      setSuccessMessage("Profile updated successfully!");
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error in updating profile");
    }
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <RefreshCw />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Update Profile
              </h1>
              <p className="text-gray-600 mt-1">
                Update your professional information
              </p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Save className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-green-800 font-medium">{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <User className="h-6 w-6 text-blue-600 mr-2" />
                Basic Information
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Profile Image */}
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="relative">
                  <img
                    src={doctorData.profileImage || "/placeholder.svg"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Profile Picture
                  </h3>
                  <p className="text-sm text-gray-600">
                    Upload a professional photo. Recommended size: 400x400px
                  </p>
                </div>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      value={doctorData.fullName}
                      onChange={(e) =>
                        handleInputChange(null, "fullName", e.target.value)
                      }
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.fullName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="tel"
                      value={doctorData.phone}
                      onChange={(e) =>
                        handleInputChange(null, "phone", e.target.value)
                      }
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="+92 300 1234567"
                      minLength={11}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* About */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About
                </label>
                <textarea
                  value={doctorData.about}
                  onChange={(e) =>
                    handleInputChange(null, "about", e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell patients about yourself, your experience, and approach to healthcare..."
                />
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div className="bg-white rounded-2xl shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Stethoscope className="h-6 w-6 text-green-600 mr-2" />
                Professional Details
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience *
                  </label>
                  <input
                    type="text"
                    value={doctorData.professionalDetails.experience}
                    onChange={(e) =>
                      handleInputChange(
                        "professionalDetails",
                        "experience",
                        e.target.value
                      )
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.experience ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g., 12 years"
                  />
                  {errors.experience && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.experience}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Fee (PKR) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="number"
                      value={doctorData.professionalDetails.consultationFee}
                      onChange={(e) =>
                        handleInputChange(
                          "professionalDetails",
                          "consultationFee",
                          Number.parseInt(e.target.value)
                        )
                      }
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.consultationFee
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="2000"
                    />
                  </div>
                  {errors.consultationFee && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.consultationFee}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average Appointment Time (minutes) *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="number"
                      value={doctorData.professionalDetails.avgAppointmentTime}
                      onChange={(e) =>
                        handleInputChange(
                          "professionalDetails",
                          "avgAppointmentTime",
                          Number.parseInt(e.target.value)
                        )
                      }
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.avgAppointmentTime
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="30"
                      min="5"
                      max="120"
                    />
                  </div>
                  {errors.avgAppointmentTime && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.avgAppointmentTime}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    This will be used to calculate your daily appointment
                    capacity
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Clinic Information */}
          <div className="bg-white rounded-2xl shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Building className="h-6 w-6 text-purple-600 mr-2" />
                Clinic Schedule
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Available Days */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Available Days *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {daysOfWeek.map((day) => (
                    <label
                      key={day}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={doctorData.clinicInfo.availableDays.includes(
                          day
                        )}
                        onChange={() => handleDayToggle(day)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{day}</span>
                    </label>
                  ))}
                </div>
                {errors.availableDays && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.availableDays}
                  </p>
                )}
              </div>

              {/* Clinic Hours */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Opening Time *
                  </label>
                  <input
                    type="time"
                    value={doctorData.clinicInfo.clinicOpenTime}
                    onChange={(e) =>
                      handleInputChange(
                        "clinicInfo",
                        "clinicOpenTime",
                        e.target.value
                      )
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.clinicOpenTime
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.clinicOpenTime && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.clinicOpenTime}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Closing Time *
                  </label>
                  <input
                    type="time"
                    value={doctorData.clinicInfo.clinicCloseTime}
                    onChange={(e) =>
                      handleInputChange(
                        "clinicInfo",
                        "clinicCloseTime",
                        e.target.value
                      )
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.clinicCloseTime
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.clinicCloseTime && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.clinicCloseTime}
                    </p>
                  )}
                </div>
              </div>

              {/* Calculated Appointments Per Day */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-blue-900">
                      Daily Appointment Capacity
                    </h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Calculated based on your working hours and average
                      appointment time
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {doctorData.clinicInfo.appointmentsPerDay}
                    </div>
                    <div className="text-sm text-blue-600">
                      appointments/day
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorProfile;
