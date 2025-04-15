"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Logo from "../../Components/Logo"

const DoctorSearch = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [filters, setFilters] = useState({
        availability: {
            availableNow: false,
        },
        specialties: {
            cardiology: false,
            neurology: false,
            pediatrics: false,
            dermatology: false,
            orthopedics: false,
            familyMedicine: false,
        },
        location: "",
        rating: {
            fourStarsAndUp: false,
            threeStarsAndUp: false,
            twoStarsAndUp: false,
        },
    })

    // Mock data for doctors
    const doctors = [
        {
            id: 1,
            name: "Dr. Sarah Johnson",
            specialty: "Cardiologist",
            rating: 2.8,
            reviews: 124,
            available: true,
            image: "/placeholder.svg",
        },
        {
            id: 2,
            name: "Dr. Michael Chen",
            specialty: "Neurologist",
            rating: 4.9,
            reviews: 89,
            available: true,
            image: "/placeholder.svg",
        },
        {
            id: 3,
            name: "Dr. Emily Williams",
            specialty: "Pediatrician",
            rating: 4.7,
            reviews: 156,
            available: false,
            image: "/placeholder.svg",
        },
        {
            id: 4,
            name: "Dr. James Wilson",
            specialty: "Dermatologist",
            rating: 4.6,
            reviews: 98,
            available: true,
            image: "/placeholder.svg",
        },
        {
            id: 5,
            name: "Dr. Lisa Anderson",
            specialty: "Orthopedic Surgeon",
            rating: 4.9,
            reviews: 167,
            available: true,
            image: "/placeholder.svg",
        },
        {
            id: 6,
            name: "Dr. Robert Taylor",
            specialty: "Family Medicine",
            rating: 4.7,
            reviews: 145,
            available: false,
            image: "/placeholder.svg",
        },
    ]

    // Handle filter changes
    const handleFilterChange = (category, item) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [category]: {
                ...prevFilters[category],
                [item]: !prevFilters[category][item],
            },
        }))
    }

    // Handle location input change
    const handleLocationChange = (e) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            location: e.target.value,
        }))
    }

    // Filter doctors based on search query and filters
    const filteredDoctors = doctors.filter((doctor) => {
        // Search query filter
        if (
            searchQuery &&
            !doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
            return false
        }

        // Availability filter
        if (filters.availability.availableNow && !doctor.available) {
            return false
        }

        // Specialties filter
        const specialtyFiltersActive = Object.values(filters.specialties).some((value) => value)
        if (specialtyFiltersActive) {
            const specialty = doctor.specialty.toLowerCase()
            if (
                (filters.specialties.cardiology && specialty.includes("cardiologist")) ||
                (filters.specialties.neurology && specialty.includes("neurologist")) ||
                (filters.specialties.pediatrics && specialty.includes("pediatrician")) ||
                (filters.specialties.dermatology && specialty.includes("dermatologist")) ||
                (filters.specialties.orthopedics && specialty.includes("orthopedic")) ||
                (filters.specialties.familyMedicine && specialty.includes("family medicine"))
            ) {
                // Match found, continue filtering
            } else {
                return false
            }
        }

        // Rating filter
        if (filters.rating.fourStarsAndUp && doctor.rating < 4) {
            return false
        }
        if (filters.rating.threeStarsAndUp && doctor.rating < 3) {
            return false
        }
        if (filters.rating.twoStarsAndUp && doctor.rating < 2) {
            return false
        }

        // Location filter
        if (filters.location && !doctor.name.toLowerCase().includes(filters.location.toLowerCase())) {
            return false
        }

        return true
    })

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Logo />

                    <div className="flex gap-8">

                        <nav className="hidden md:flex items-center space-x-6">
                            <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-blue-500">
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
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                Home
                            </Link>
                            <Link to="/appointments" className="flex items-center text-gray-600 hover:text-blue-500">
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
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                Appointments
                            </Link>
                            <Link to="/profile" className="flex items-center text-gray-600 hover:text-blue-500">
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
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                Profile
                            </Link>
                        </nav>

                        <div className="flex items-center">
                            <div className="bg-gray-200 rounded-full p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-500"
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
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar - Filters */}
                    <div className="hidden sm:block md:w-64 md:pr-8 mb-6 md:mb-0">
                        <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
                            <div className="flex items-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-500 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                    />
                                </svg>
                                <h2 className="text-lg font-medium">Filters</h2>
                            </div>

                            {/* Availability Filter */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium mb-2">Availability</h3>
                                <div className="flex items-center">
                                    <input
                                        id="available-now"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={filters.availability.availableNow}
                                        onChange={() => handleFilterChange("availability", "availableNow")}
                                    />
                                    <label htmlFor="available-now" className="ml-2 text-sm text-gray-700">
                                        Available Now
                                    </label>
                                </div>
                            </div>

                            {/* Specialties Filter */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium mb-2">Specialties</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <input
                                            id="cardiology"
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            checked={filters.specialties.cardiology}
                                            onChange={() => handleFilterChange("specialties", "cardiology")}
                                        />
                                        <label htmlFor="cardiology" className="ml-2 text-sm text-gray-700">
                                            Cardiology
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="neurology"
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            checked={filters.specialties.neurology}
                                            onChange={() => handleFilterChange("specialties", "neurology")}
                                        />
                                        <label htmlFor="neurology" className="ml-2 text-sm text-gray-700">
                                            Neurology
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="pediatrics"
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            checked={filters.specialties.pediatrics}
                                            onChange={() => handleFilterChange("specialties", "pediatrics")}
                                        />
                                        <label htmlFor="pediatrics" className="ml-2 text-sm text-gray-700">
                                            Pediatrics
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="dermatology"
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            checked={filters.specialties.dermatology}
                                            onChange={() => handleFilterChange("specialties", "dermatology")}
                                        />
                                        <label htmlFor="dermatology" className="ml-2 text-sm text-gray-700">
                                            Dermatology
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="orthopedics"
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            checked={filters.specialties.orthopedics}
                                            onChange={() => handleFilterChange("specialties", "orthopedics")}
                                        />
                                        <label htmlFor="orthopedics" className="ml-2 text-sm text-gray-700">
                                            Orthopedics
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="family-medicine"
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            checked={filters.specialties.familyMedicine}
                                            onChange={() => handleFilterChange("specialties", "familyMedicine")}
                                        />
                                        <label htmlFor="family-medicine" className="ml-2 text-sm text-gray-700">
                                            Family Medicine
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Location Filter */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium mb-2">Location</h3>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="Enter location..."
                                        value={filters.location}
                                        onChange={handleLocationChange}
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div>
                                <h3 className="text-sm font-medium mb-2">Rating</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <input
                                            id="four-stars"
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            checked={filters.rating.fourStarsAndUp}
                                            onChange={() => handleFilterChange("rating", "fourStarsAndUp")}
                                        />
                                        <label htmlFor="four-stars" className="ml-2 text-sm text-gray-700 flex items-center">
                                            <div className="flex">
                                                {[...Array(4)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 text-yellow-400"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                                <span className="ml-1">& up</span>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="three-stars"
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            checked={filters.rating.threeStarsAndUp}
                                            onChange={() => handleFilterChange("rating", "threeStarsAndUp")}
                                        />
                                        <label htmlFor="three-stars" className="ml-2 text-sm text-gray-700 flex items-center">
                                            <div className="flex">
                                                {[...Array(3)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 text-yellow-400"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                                <span className="ml-1">& up</span>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="two-stars"
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            checked={filters.rating.twoStarsAndUp}
                                            onChange={() => handleFilterChange("rating", "twoStarsAndUp")}
                                        />
                                        <label htmlFor="two-stars" className="ml-2 text-sm text-gray-700 flex items-center">
                                            <div className="flex">
                                                {[...Array(2)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 text-yellow-400"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                                <span className="ml-1">& up</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content - Doctor Search */}
                    <div className="w-full md:flex-1">
                        {/* Search Bar */}
                        <div className="mb-6">
                            <div className="relative">
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
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search for a doctor by name or specialty..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="mb-6">
                            <h2 className="text-xl font-medium">Found {filteredDoctors.length} doctors</h2>
                        </div>

                        {/* Doctor Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {filteredDoctors.map((doctor) => (
                                <div
                                    key={doctor.id}
                                    className="bg-white rounded-lg overflow-hidden flex flex-col items-center p-6 shadow-sm"
                                >
                                    <img
                                        src={doctor.image || "/placeholder.svg"}
                                        alt={doctor.name}
                                        className="w-24 h-24 rounded-full mb-4 object-cover"
                                    />
                                    <h3 className="text-lg font-semibold text-center">{doctor.name}</h3>
                                    <p className="text-gray-600 mb-2 text-center">{doctor.specialty}</p>

                                    <div className="flex items-center mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? "text-yellow-400" : "text-gray-300"}`}
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                        <span className="ml-1 text-gray-600 text-sm">
                                            {doctor.rating} ({doctor.reviews} reviews)
                                        </span>
                                    </div>

                                    <div className="flex items-center mb-4">
                                        <div
                                            className={`w-2 h-2 rounded-full ${doctor.available ? "bg-green-500" : "bg-gray-400"} mr-2`}
                                        ></div>
                                        <span className="text-sm text-gray-600">{doctor.available ? "Available Now" : "Unavailable"}</span>
                                    </div>

                                    <Link
                                        to={`/book-appointment/${doctor.id}`}
                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-center transition duration-200"
                                    >
                                        Book Appointment
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorSearch


