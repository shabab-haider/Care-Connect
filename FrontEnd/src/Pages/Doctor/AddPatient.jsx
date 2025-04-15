"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import DoctorHeader from "../../Components/DoctorHeader"

const AddPatient = () => {
    const [patientData, setPatientData] = useState({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        phoneNumber: "",
        email: "",
        allergies: "",
        medicalConditions: "",
        currentMedications: "",
    })

    const [patientId, setPatientId] = useState("PC-2024-001")

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setPatientData({
            ...patientData,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission logic here
        console.log("Patient data submitted:", patientData)
        // Redirect to patients list or show success message
    }

    const handleCancel = () => {
        // Redirect to previous page or patients list
        console.log("Form cancelled")
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <DoctorHeader />

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center text-sm">
                    <Link to="/dashboard" className="text-gray-500 hover:text-blue-500 flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        Dashboard
                    </Link>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mx-2 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-gray-700">Add Patient</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Form Section */}
                    <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-sm p-6">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Patient</h1>

                        <form onSubmit={handleSubmit}>
                            {/* Basic Information */}
                            <div className="mb-8">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>

                                <div className="mb-4">
                                    <label htmlFor="fullName" className="block text-gray-700 mb-2">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter patient's full name"
                                        value={patientData.fullName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="dateOfBirth" className="block text-gray-700 mb-2">
                                            Date of Birth <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="dateOfBirth"
                                                name="dateOfBirth"
                                                type="date"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="MM/DD/YYYY"
                                                value={patientData.dateOfBirth}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="gender" className="block text-gray-700 mb-2">
                                            Gender <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="gender"
                                                name="gender"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                                value={patientData.gender}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="" disabled>
                                                    Select gender
                                                </option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                                <option value="prefer-not-to-say">Prefer not to say</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-gray-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="phoneNumber" className="block text-gray-700 mb-2">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                type="tel"
                                                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="(123) 456-7890"
                                                value={patientData.phoneNumber}
                                                onChange={handleInputChange}
                                                required
                                            />
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
                                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-gray-700 mb-2">
                                            Email Address <span className="text-gray-500 text-sm font-normal">(Optional)</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="patient@example.com"
                                                value={patientData.email}
                                                onChange={handleInputChange}
                                            />
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
                                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Medical History */}
                            <div className="mb-8">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Medical History</h2>

                                <div className="mb-4">
                                    <label htmlFor="allergies" className="block text-gray-700 mb-2">
                                        Allergies <span className="text-gray-500 text-sm font-normal">(Optional)</span>
                                    </label>
                                    <textarea
                                        id="allergies"
                                        name="allergies"
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="List any known allergies"
                                        value={patientData.allergies}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="medicalConditions" className="block text-gray-700 mb-2">
                                        Existing Medical Conditions <span className="text-gray-500 text-sm font-normal">(Optional)</span>
                                    </label>
                                    <textarea
                                        id="medicalConditions"
                                        name="medicalConditions"
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="List any existing medical conditions"
                                        value={patientData.medicalConditions}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="currentMedications" className="block text-gray-700 mb-2">
                                        Current Medications <span className="text-gray-500 text-sm font-normal">(Optional)</span>
                                    </label>
                                    <textarea
                                        id="currentMedications"
                                        name="currentMedications"
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="List current medications"
                                        value={patientData.currentMedications}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Preview Section */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Patient Preview</h2>

                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-gray-400"
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
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Patient ID</div>
                                    <div className="font-medium">{patientId}</div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4 mb-4">
                                <div className="text-sm font-medium text-gray-700 mb-2">Full Name</div>
                                <div className="text-gray-600">{patientData.fullName || "---"}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4 mb-4">
                                <div>
                                    <div className="text-sm font-medium text-gray-700 mb-2">Date of Birth</div>
                                    <div className="text-gray-600">{patientData.dateOfBirth || "---"}</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-700 mb-2">Gender</div>
                                    <div className="text-gray-600">{patientData.gender || "---"}</div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <div className="text-sm font-medium text-gray-700 mb-2">Contact Information</div>
                                <div className="text-gray-600">{patientData.phoneNumber || patientData.email || "---"}</div>
                            </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <div className="flex items-start">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-amber-500 mt-0.5 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                                <div>
                                    <div className="font-medium text-amber-800 mb-1">Please Note</div>
                                    <div className="text-sm text-amber-700">
                                        All required fields must be filled before saving the patient record.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end mt-6 space-x-4">
                    <button
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={handleSubmit}
                    >
                        Save Patient
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddPatient

