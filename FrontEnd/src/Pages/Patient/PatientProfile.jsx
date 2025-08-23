"use client";

import { useState, useContext } from "react";
import { User, Camera, Save, X, Check, Edit3 } from "lucide-react";
import { PatientDataContext } from "../../Context/PatientContext";
import Header from "../../Components/Header";
import axios from "axios";
import { toast } from "react-toastify";

const PatientProfile = () => {
  const { patient, setPatient } = useContext(PatientDataContext);

  // Form data
  const [formData, setFormData] = useState({
    id: patient._id,
    fullname: patient?.fullname || "",
    gender: patient?.gender || "",
    phoneNumber: patient?.phoneNumber || "",
    profileImage: patient?.profileImage || "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle image upload (keep original function)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", "Care_Connect");
    formDataUpload.append("cloud_name", "di9ljccil");
    console.log("Uploading image...");
    toast.promise(
      fetch("https://api.cloudinary.com/v1_1/di9ljccil/image/upload", {
        method: "POST",
        body: formDataUpload,
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error("Upload failed");
        }
        const uploadedImage = await res.json();
        setFormData((prev) => ({
          ...prev,
          profileImage: uploadedImage.url,
        }));
        console.log("Upload complete ✅");
      }),
      {
        pending: "Uploading...",
        success: "Uploaded successfully!",
        error: "Failed to upload",
      }
    );
  };

  // Handle form submission (keep original API call)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(formData);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/patients/update`,
        formData
      );

      console.log(response.data);

      // Update patient context
      setPatient((prev) => ({
        ...prev,
        ...formData,
      }));

      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({
      id: patient._id,
      fullname: patient?.fullname || "",
      gender: patient?.gender || "",
      phone: patient?.phoneNumber || "",
      profileImage: patient?.profileImage || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
                <User className="h-8 w-8 text-blue-600 mr-3" />
                My Profile
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your personal information
              </p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center">
            <Check className="h-5 w-5 mr-2" />
            {successMessage}
          </div>
        )}

        {/* Profile Form */}
        <div className="bg-white rounded-2xl shadow-sm border">
          <form onSubmit={handleSubmit}>
            <div className="p-6 sm:p-8">
              {/* Profile Image */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                    {formData.profileImage ? (
                      <img
                        src={formData.profileImage || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors">
                      <Camera className="h-4 w-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {isEditing
                    ? "Click camera icon to change photo"
                    : "Profile Photo"}
                </p>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.fullname}
                      onChange={(e) =>
                        handleInputChange("fullname", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                      required
                      minLength={2}
                      maxLength={50}
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-900">
                        {formData.fullname || "Not provided"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        handleInputChange("phoneNumber", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+92 300 1234567"
                      required
                      minLength={10}
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-900">
                        {formData.phoneNumber || "Not provided"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  {isEditing ? (
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-900">
                        {formData.gender || "Not provided"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t rounded-b-2xl">
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                      isLoading
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
