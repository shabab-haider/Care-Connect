import { Link } from "react-router-dom"

const PatientDetails = () => {
    // Sample patient data
    const patient = {
        id: "#284751",
        name: "Sarah Johnson",
        age: 34,
        dob: "12/05/1989",
        address: "123 Medical Drive, Health City",
        phone: "+1 (555) 123-4567",
        email: "sarah.j@email.com",
        stats: {
            totalVisits: 12,
            activeMeds: 4,
        },
        allergies: ["Penicillin"],
        bloodType: "A+",
        medicalHistory: [
            {
                date: "Jan 15, 2024",
                type: "Regular Checkup",
                doctor: "Dr. Michael Chen",
                specialty: "Cardiology",
                notes: "Blood pressure normal. ECG shows regular rhythm. Recommended continued exercise routine.",
            },
            {
                date: "Dec 3, 2023",
                type: "Upper Respiratory Infection",
                doctor: "Dr. Sarah Williams",
                specialty: "General Medicine",
                notes: "Prescribed antibiotics for 7 days. Follow-up if symptoms persist.",
            },
            {
                date: "Oct 18, 2023",
                type: "Knee Pain Assessment",
                doctor: "Dr. James Wilson",
                specialty: "Orthopedics",
                notes: "MRI scheduled. Recommended physical therapy 2x/week.",
            },
        ],
        medications: [
            {
                name: "Lisinopril",
                dosage: "10mg",
                frequency: "Once daily",
                startDate: "Jan 15, 2024",
                endDate: "Ongoing",
            },
            {
                name: "Metformin",
                dosage: "500mg",
                frequency: "Twice daily",
                startDate: "Dec 3, 2023",
                endDate: "Ongoing",
            },
            {
                name: "Vitamin D3",
                dosage: "2000 IU",
                frequency: "Once daily",
                startDate: "Oct 18, 2023",
                endDate: "Ongoing",
            },
        ],
        doctorNotes: [
            {
                date: "Jan 15, 2024",
                doctor: "Dr. Michael Chen",
                notes:
                    "Patient reports feeling well. Blood pressure 120/80. Heart rate 72 bpm. Regular exercise routine maintained. No new complaints.",
            },
            {
                date: "Dec 3, 2023",
                doctor: "Dr. Sarah Williams",
                notes:
                    "Patient presents with sore throat and cough for 3 days. Temp 99.1°F. Throat slightly red. Lungs clear. Prescribed amoxicillin 500mg TID for 7 days.",
            },
        ],
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-6">
                {/* Header with Back Button and Search */}
                <div className="flex justify-between items-center mb-6">
                    <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-blue-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="hidden md:block">Back to Dashboard</span>
                    </Link>

                    <div className="relative w-full max-w-md mx-4">
                        <input
                            type="text"
                            placeholder="Search patient by ID..."
                            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

                    {/* <button className="flex items-center text-gray-600 hover:text-blue-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                            />
                        </svg>
                        Print Report
                    </button> */}
                </div>

                <div className="flex flex-col md:flex-row">
                    {/* Left Sidebar - Patient Info */}
                    <div className="w-full md:w-1/4 bg-white rounded-lg shadow-sm p-6 mb-6 md:mb-0 md:mr-6">
                        {/* Patient Profile */}
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12 text-gray-400"
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
                            <h2 className="text-xl font-bold text-gray-800">{patient.name}</h2>
                            <p className="text-gray-600">Patient ID: {patient.id}</p>
                        </div>

                        {/* Personal Information */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-400 mr-2 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span className="text-gray-600">
                                        {patient.age} years old (DOB: {patient.dob})
                                    </span>
                                </div>
                                <div className="flex items-start">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-400 mr-2 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span className="text-gray-600">{patient.address}</span>
                                </div>
                                <div className="flex items-start">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-400 mr-2 mt-0.5"
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
                                    <span className="text-gray-600">{patient.phone}</span>
                                </div>
                                <div className="flex items-start">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-400 mr-2 mt-0.5"
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
                                    <span className="text-gray-600">{patient.email}</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Stats</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg text-center">
                                    <span className="block text-2xl font-bold text-blue-500">{patient.stats.totalVisits}</span>
                                    <span className="text-sm text-gray-600">Total Visits</span>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg text-center">
                                    <span className="block text-2xl font-bold text-green-500">{patient.stats.activeMeds}</span>
                                    <span className="text-sm text-gray-600">Active Meds</span>
                                </div>
                            </div>
                        </div>

                        {/* Allergies and Blood Type */}
                        <div>
                            <div className="bg-red-50 p-3 rounded-lg mb-3">
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-red-500 mr-2"
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
                                    <span className="font-medium text-red-700">Allergies</span>
                                </div>
                                <div className="mt-1 pl-7">
                                    {patient.allergies.length > 0 ? (
                                        patient.allergies.map((allergy, index) => (
                                            <span key={index} className="text-gray-600">
                                                {allergy}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-600">No known allergies</span>
                                    )}
                                </div>
                            </div>

                            <div className="bg-purple-50 p-3 rounded-lg">
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-purple-500 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                        />
                                    </svg>
                                    <span className="font-medium text-purple-700">Blood</span>
                                </div>
                                <div className="mt-1 pl-7">
                                    <span className="text-gray-600">{patient.bloodType}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content - Medical History */}
                    <div className="w-full md:w-3/4">
                        {/* Medical History Section */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Medical History</h2>

                            {patient.medicalHistory.map((record, index) => (
                                <div key={index} className={`border-b ${index === 0 ? "" : "pt-4"} pb-4`}>
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                                        <div className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-blue-500 mr-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <span className="font-medium">{record.date}</span>
                                        </div>
                                        <div className="flex items-center mt-2 md:mt-0">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-500 mr-1"
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
                                            <span className="text-gray-700 mr-2">{record.doctor}</span>
                                            <span className="text-gray-500">|</span>
                                            <span className="text-gray-700 ml-2">{record.specialty}</span>
                                        </div>
                                    </div>
                                    <h3 className="font-medium text-gray-800 mb-1">{record.type}</h3>
                                    <p className="text-gray-600">{record.notes}</p>
                                </div>
                            ))}
                        </div>

                        {/* Current Medications Section */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Current Medications</h2>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Medication
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Dosage
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Frequency
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Start Date
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                End Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {patient.medications.map((medication, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {medication.name}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{medication.dosage}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{medication.frequency}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{medication.startDate}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{medication.endDate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Doctor's Notes Section */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Doctor's Notes</h2>

                            {patient.doctorNotes.map((note, index) => (
                                <div key={index} className={`${index === 0 ? "" : "mt-6"}`}>
                                    <div className="flex items-center mb-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-blue-500 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                        <span className="font-medium mr-2">{note.date}</span>
                                        <span className="text-gray-500">|</span>
                                        <span className="text-gray-700 ml-2">{note.doctor}</span>
                                    </div>
                                    <p className="text-gray-600 pl-7">{note.notes}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientDetails

