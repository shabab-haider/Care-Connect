import { useEffect, useState } from "react";
import {
  Calendar,
  Plus,
  Trash2,
  Save,
  FileText,
  Pill,
  User,
  Stethoscope,
  X,
  CheckCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ConsultationForm = () => {
  const { doctorId, patientId, appointmentId } = useParams();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    appointmentDetails: "",
    prescription: {
      validity: "",
      medicines: [
        {
          name: "",
          instructions: "",
          frequency: [],
          dosage: "",
        },
      ],
    },
  });

  // Sample patient data - would come from props or context in real app
  const [patientData, setPatientData] = useState({
    name: "John Smith",
    gender: "Male",
    tokenNumber: "A-15",
  });

  useEffect(() => {
    const getPatientData = async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/appointments/getAppointmentData/${appointmentId}`
      );
      setPatientData(response.data);
    };
    getPatientData();
  }, []);

  const frequencyOptions = [
    "Morning",
    "Afternoon",
    "Evening",
    "Night",
    "Before Meals",
    "After Meals",
    "As Needed",
  ];

  const handleAppointmentDetails = (e) => {
    setFormData((prev) => ({
      ...prev,
      appointmentDetails: e.target.value,
    }));
  };

  const handleInputChange = (field, value) => {
    if (field.includes("prescription.")) {
      const prescriptionField = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        prescription: {
          ...prev.prescription,
          [prescriptionField]: value,
        },
      }));
    }
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...formData.prescription.medicines];
    updatedMedicines[index] = {
      ...updatedMedicines[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      prescription: {
        ...prev.prescription,
        medicines: updatedMedicines,
      },
    }));
  };

  const handleFrequencyChange = (medicineIndex, frequency) => {
    const updatedMedicines = [...formData.prescription.medicines];
    const currentFrequencies = updatedMedicines[medicineIndex].frequency;

    if (currentFrequencies.includes(frequency)) {
      updatedMedicines[medicineIndex].frequency = currentFrequencies.filter(
        (f) => f !== frequency
      );
    } else {
      updatedMedicines[medicineIndex].frequency = [
        ...currentFrequencies,
        frequency,
      ];
    }

    setFormData((prev) => ({
      ...prev,
      prescription: {
        ...prev.prescription,
        medicines: updatedMedicines,
      },
    }));
  };

  const addMedicine = () => {
    setFormData((prev) => ({
      ...prev,
      prescription: {
        ...prev.prescription,
        medicines: [
          ...prev.prescription.medicines,
          {
            name: "",
            instructions: "",
            frequency: [],
            dosage: "",
          },
        ],
      },
    }));
  };

  const removeMedicine = (index) => {
    if (formData.prescription.medicines.length > 1) {
      const updatedMedicines = formData.prescription.medicines.filter(
        (_, i) => i !== index
      );
      setFormData((prev) => ({
        ...prev,
        prescription: {
          ...prev.prescription,
          medicines: updatedMedicines,
        },
      }));
    }
  };

  const validateForm = () => {
    if (!formData.prescription.validity) {
      alert("Please set prescription validity date");
      return false;
    }

    for (let i = 0; i < formData.prescription.medicines.length; i++) {
      const medicine = formData.prescription.medicines[i];
      if (
        !medicine.name ||
        !medicine.dosage ||
        medicine.frequency.length === 0
      ) {
        alert(`Please fill all fields for medicine ${i + 1}`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      console.log("Consultation Data:", formData);
      const response = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/medicalRecord/createMedicalRecord/${doctorId}/${patientId}`,
        { formData }
      );
      console.log(response);
      if ((response.status = 201)) {
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Error saving consultation:", error);
      alert("Error saving consultation. Please try again.");
    }
  };

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Consultation Completed!
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            The consultation has been saved successfully. The patient will
            receive their prescription details.
          </p>
          <div className="flex gap-3">
            <Link
              to="/doctor-dashboard"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Back to Dashboard
            </Link>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                // Reset form for next patient
                setFormData({
                  appointmentDetails: "",
                  prescription: {
                    validity: "",
                    medicines: [
                      { name: "", instructions: "", frequency: [], dosage: "" },
                    ],
                  },
                });
              }}
              className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg font-medium transition-colors"
            >
              New Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Stethoscope className="h-6 w-6 text-blue-600 mr-3" />
                Consultation Form
              </h1>
              <p className="text-gray-600 mt-1">
                Complete the appointment and provide prescription
              </p>
            </div>
            <Link
              to="/doctor-dashboard"
              className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Patient Information */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 text-blue-600 mr-2" />
            Patient Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Patient Name</p>
              <p className="font-semibold text-gray-900">{patientData.name}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Token Number</p>
              <p className="font-semibold text-blue-600">
                A-{patientData.tokenNumber}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Gender</p>
              <p className="font-semibold text-gray-900">
                {patientData.gender}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Appointment Details */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 text-green-600 mr-2" />
              Appointment Details
            </h2>
            <div className="space-y-4">
              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appointment Type <span className="text-red-500">*</span>
                </label> */}
                <textarea
                  id="appointmentType"
                  value={formData.appointmentDetails}
                  onChange={(e) => handleAppointmentDetails(e)}
                  placeholder="Enter appointment details"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Prescription */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Pill className="h-5 w-5 text-green-600 mr-2" />
                Prescription
              </h2>
            </div>

            {/* Prescription Validity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prescription Validity <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.prescription.validity}
                  onChange={(e) =>
                    handleInputChange("prescription.validity", e.target.value)
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                
              </div>
            </div>

            {/* Medicines */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-md font-medium text-gray-900">Medicines</h3>
                <button
                  type="button"
                  onClick={addMedicine}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Medicine
                </button>
              </div>

              {formData.prescription.medicines.map((medicine, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 relative"
                >
                  {formData.prescription.medicines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMedicine(index)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Medicine Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={medicine.name}
                        onChange={(e) =>
                          handleMedicineChange(index, "name", e.target.value)
                        }
                        placeholder="Enter medicine name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dosage <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={medicine.dosage}
                        onChange={(e) =>
                          handleMedicineChange(index, "dosage", e.target.value)
                        }
                        placeholder="e.g., 500mg, 2 tablets, 1 spoon"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frequency <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {frequencyOptions.map((freq) => (
                        <label
                          key={freq}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={medicine.frequency.includes(freq)}
                            onChange={() => handleFrequencyChange(index, freq)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{freq}</span>
                        </label>
                      ))}
                    </div>
                    {medicine.frequency.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {medicine.frequency.map((freq) => (
                          <span
                            key={freq}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {freq}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instructions
                    </label>
                    <textarea
                      value={medicine.instructions}
                      onChange={(e) =>
                        handleMedicineChange(
                          index,
                          "instructions",
                          e.target.value
                        )
                      }
                      placeholder="e.g., Take after meals, Avoid alcohol, Take with water"
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/doctor-dashboard"
                className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-6 rounded-lg font-medium transition-colors text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Complete Consultation
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && <SuccessModal />}
    </div>
  );
};

export default ConsultationForm;
