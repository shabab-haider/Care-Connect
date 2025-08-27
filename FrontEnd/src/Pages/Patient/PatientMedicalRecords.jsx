"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Calendar,
  Stethoscope,
  Pill,
  Search,
  Filter,
  Eye,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import LogoAndBack from "../../Components/LogoAndBack";
import Header from "../../Components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PatientMedicalRecords = () => {
  const { patientId } = useParams();
  // Dummy medical records data
  const [medicalRecords, setMedicalRecords] = useState([
    {
      _id: "1",
      doctor: {
        name: "Dr. Ahmed Hassan",
        specialization: "Cardiologist",
      },
      patient: "patient_id_1",
      date: "2024-01-20",
      appointmentDetails:
        "Patient came with chest pain and shortness of breath. After examination, diagnosed with mild hypertension. Blood pressure was 140/90. Advised lifestyle changes and prescribed medication.",
      prescription: {
        validity: "2024-02-20",
        medicines: [
          {
            name: "Amlodipine",
            instructions: "Take with food",
            frequency: ["Morning", "Evening"],
            dosage: "5mg",
          },
          {
            name: "Metoprolol",
            instructions: "Take on empty stomach",
            frequency: ["Morning"],
            dosage: "25mg",
          },
        ],
      },
    },
  ]);

  useEffect(() => {
    const getMedicalRecords = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/medicalRecord/getMedicalRecords/${patientId}`
        );
        console.log(response.data);
        setMedicalRecords(response.data);
      } catch (error) {
        console.error("Error fetching medical records:", error);
        toast.error("Error fetching medical records");
      }
    };
    getMedicalRecords();
  }, [patientId]);

  const [filteredRecords, setFilteredRecords] = useState([]);
  const [expandedRecords, setExpandedRecords] = useState(new Set());
  const [filters, setFilters] = useState({
    search: "",
    selectedDate: "",
    doctorName: "",
  });

  // Initialize filtered records
  useEffect(() => {
    setFilteredRecords(medicalRecords);
  }, [medicalRecords]);

  // Filter medical records based on selected filters
  useEffect(() => {
    let filtered = [...medicalRecords];

    // Filter by search (doctor name or appointment details)
    if (filters.search) {
      filtered = filtered.filter(
        (record) =>
          record.doctor?.name
            ?.toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          record.appointmentDetails
            .toLowerCase()
            .includes(filters.search.toLowerCase())
      );
    }

    // Filter by selected date
    if (filters.selectedDate) {
      filtered = filtered.filter(
        (record) => record.date === filters.selectedDate
      );
    }

    // Filter by doctor name
    if (filters.doctorName) {
      filtered = filtered.filter((record) =>
        record.doctor?.name
          ?.toLowerCase()
          .includes(filters.doctorName.toLowerCase())
      );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredRecords(filtered);
  }, [medicalRecords, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const toggleRecordExpansion = (recordId) => {
    const newExpanded = new Set(expandedRecords);
    if (newExpanded.has(recordId)) {
      newExpanded.delete(recordId);
    } else {
      newExpanded.add(recordId);
    }
    setExpandedRecords(newExpanded);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isPrescriptionValid = (validityDate) => {
    return new Date(validityDate) >= new Date();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
                <FileText className="h-8 w-8 text-blue-600 mr-3" />
                Medical Records
              </h1>
              <p className="text-gray-600 mt-2">
                View your complete medical history and prescriptions
              </p>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg border">
              <p className="text-sm text-gray-600">Total Records</p>
              <p className="text-2xl font-bold text-blue-600">
                {medicalRecords.length}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border mb-6">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search by doctor name or diagnosis..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Date Filter */}
              <div className="relative">
                <div className="flex items-center">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10" />
                  <input
                    type="date"
                    value={filters.selectedDate}
                    onChange={(e) =>
                      handleFilterChange("selectedDate", e.target.value)
                    }
                    className="appearance-none bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {filters.selectedDate && (
                  <button
                    onClick={() => handleFilterChange("selectedDate", "")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Medical Records List */}
        <div className="bg-white rounded-2xl shadow-sm border">
          <div className="p-4 sm:p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Medical Records ({filteredRecords.length})
              </h2>
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="p-4 sm:p-6">
            {filteredRecords.length > 0 ? (
              <div className="space-y-4">
                {filteredRecords.map((record, index) => {
                  const isExpanded = expandedRecords.has(record._id);
                  return (
                    <div
                      key={record._id || index}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {/* Record Header */}
                      <div className="p-4 bg-gray-50">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                              <img
                                src={
                                  record.doctor.profileImage ||
                                  "/placeholder.svg"
                                }
                                alt="Profile"
                                className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">
                                {record.doctor?.name || "Dr. Name"}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {record.doctor?.specialization ||
                                  "Specialization"}{" "}
                                • {formatDate(record.date)}
                              </p>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {formatDate(record.date)}
                                </div>
                                <div className="flex items-center">
                                  <Pill className="h-4 w-4 mr-1" />
                                  {record.prescription.medicines.length}{" "}
                                  Medicine(s)
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                isPrescriptionValid(
                                  record.prescription.validity
                                )
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {isPrescriptionValid(record.prescription.validity)
                                ? "Active"
                                : "Expired"}
                            </span>
                            <button
                              onClick={() => toggleRecordExpansion(record._id)}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg font-medium transition-colors flex items-center"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="h-4 w-4 mr-1" />
                                  Less
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-4 w-4 mr-1" />
                                  More
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="p-4 border-t bg-white">
                          <div className="space-y-4">
                            {/* Appointment Details */}
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">
                                Appointment Details:
                              </h4>
                              <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
                                {record.appointmentDetails}
                              </p>
                            </div>

                            {/* Prescription Summary */}
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">
                                Prescription Summary:
                              </h4>
                              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                <p className="text-sm text-green-700 mb-2">
                                  Valid until:{" "}
                                  {formatDate(record.prescription.validity)}
                                </p>
                                <div className="space-y-2">
                                  {record.prescription.medicines
                                    .slice(0, 2)
                                    .map((medicine, medIndex) => (
                                      <div key={medIndex} className="text-sm">
                                        <span className="font-medium text-gray-900">
                                          {medicine.name}
                                        </span>
                                        <span className="text-gray-600 ml-2">
                                          - {medicine.dosage}
                                        </span>
                                      </div>
                                    ))}
                                  {record.prescription.medicines.length > 2 && (
                                    <p className="text-sm text-gray-500">
                                      +
                                      {record.prescription.medicines.length - 2}{" "}
                                      more medicine(s)
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No medical records found
                </h3>
                <p className="text-gray-500 mb-6">
                  {filters.search || filters.selectedDate
                    ? "Try adjusting your filters to see more results."
                    : "No medical records available yet."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientMedicalRecords;
