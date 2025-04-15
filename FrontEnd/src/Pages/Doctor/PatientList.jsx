"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import DoctorHeader from "../../Components/DoctorHeader"

const PatientsList = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [patientsData, setPatientsData] = useState([
        {
            id: "PT-2024-001",
            name: "Sarah Johnson",
            image: "/placeholder.svg",
            lastAppointment: "Jan 15, 2024",
            assignedDoctor: "Dr. Michael Chen",
            status: "Active",
        },
        {
            id: "PT-2024-002",
            name: "Robert Williams",
            image: "/placeholder.svg",
            lastAppointment: "Jan 14, 2024",
            assignedDoctor: "Dr. Emily Davis",
            status: "Active",
        },
        {
            id: "PT-2024-003",
            name: "Maria Garcia",
            image: "/placeholder.svg",
            lastAppointment: "Jan 12, 2024",
            assignedDoctor: "Dr. Michael Chen",
            status: "Inactive",
        },
        {
            id: "PT-2024-004",
            name: "James Brown",
            image: "/placeholder.svg",
            lastAppointment: "Jan 10, 2024",
            assignedDoctor: "Dr. Sarah Wilson",
            status: "Active",
        },
        {
            id: "PT-2024-005",
            name: "Emma Thompson",
            image: "/placeholder.svg",
            lastAppointment: "Jan 08, 2024",
            assignedDoctor: "Dr. Emily Davis",
            status: "Active",
        },
    ])

    const totalPatients = 247
    const patientsPerPage = 5
    const totalPages = Math.ceil(totalPatients / patientsPerPage)

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handleDeletePatient = (patientId) => {
        if (window.confirm("Are you sure you want to delete this patient?")) {
            setPatientsData(patientsData.filter((patient) => patient.id !== patientId))
        }
    }

    // Generate pagination numbers
    const renderPaginationNumbers = () => {
        const pages = []

        // Always show first page
        pages.push(
            <button
                key={1}
                onClick={() => handlePageChange(1)}
                className={`w-10 h-10 rounded-md ${currentPage === 1 ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
            >
                1
            </button>,
        )

        // Calculate range of pages to show
        const startPage = Math.max(2, currentPage - 1)
        const endPage = Math.min(totalPages - 1, currentPage + 1)

        // Add ellipsis after first page if needed
        if (startPage > 2) {
            pages.push(
                <span key="ellipsis1" className="px-2">
                    ...
                </span>,
            )
        }

        // Add middle pages
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`w-10 h-10 rounded-md ${currentPage === i ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                >
                    {i}
                </button>,
            )
        }

        // Add ellipsis before last page if needed
        if (endPage < totalPages - 1) {
            pages.push(
                <span key="ellipsis2" className="px-2">
                    ...
                </span>,
            )
        }

        // Always show last page if there's more than one page
        if (totalPages > 1) {
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={`w-10 h-10 rounded-md ${currentPage === totalPages ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                >
                    {totalPages}
                </button>,
            )
        }

        return pages
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <DoctorHeader />

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center text-sm">
                    <Link to="/dashboard" className="text-gray-500 hover:text-blue-500">
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
                    <span className="text-gray-700">Patients</span>
                </div>
            </div>  

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {/* Header with Add Button */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Patients List</h1>
                            <p className="text-gray-600">Total: {totalPatients} patients</p>
                        </div>
                        <Link
                            to="/add-patient"
                            className="mt-4 md:mt-0 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition duration-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add New Patient
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for Patient"
                                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={searchTerm}
                                onChange={handleSearch}
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
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Patients Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Patient ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Patient Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Appointment
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Assigned Doctor
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {patientsData.map((patient) => (
                                    <tr key={patient.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                                                    <img
                                                        src={patient.image || "/placeholder.svg"}
                                                        alt={patient.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.lastAppointment}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.assignedDoctor}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${patient.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                {patient.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex space-x-3">
                                                <button className="text-blue-500 hover:text-blue-700" title="View Patient">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        />
                                                    </svg>
                                                </button>
                                                <button className="text-gray-500 hover:text-gray-700" title="Edit Patient">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                        />
                                                    </svg>
                                                </button>
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    title="Delete Patient"
                                                    onClick={() => handleDeletePatient(patient.id)}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0 text-sm text-gray-600">
                            Showing {(currentPage - 1) * patientsPerPage + 1} to{" "}
                            {Math.min(currentPage * patientsPerPage, totalPatients)} of {totalPatients} results
                        </div>
                        <div className="flex space-x-1">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 rounded-md ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                Previous
                            </button>

                            <div className="flex space-x-1">{renderPaginationNumbers()}</div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 rounded-md ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientsList

