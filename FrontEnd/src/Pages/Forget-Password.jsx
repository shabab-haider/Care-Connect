import { useState } from "react"
import { Link } from "react-router-dom"
import ForgetPasswordImage from '../assets/ForgetPasswordImage.png'
import Logo from '../assets/Logo.png'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle password reset logic here
        console.log({ email })
        // Simulate successful submission
        setIsSubmitted(true)
    }

    return (
        <div className="flex min-h-screen">
            {/* Left Section - Form */}
            <div className="w-full lg:w-1/2 flex flex-col p-10 lg:p-20 justify-center">
                <div className="mb-10">
                    <Link to="/" className="flex items-center">
                            <img
                    src={Logo}
                    alt="Logo"
                    className="h-7 w-7 mb-2"
                />
                        <span className="ml-1 text-xl font-bold text-gray-800">Care Connect</span>
                    </Link>
                </div>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
                    <p className="text-gray-600">Enter your email and we'll send you instructions to reset your password</p>
                </div>

                {isSubmitted ? (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
                        <p>Password reset link sent! Please check your email.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition duration-200"
                        >
                            Send Reset Link
                        </button>
                    </form>
                )}

                <div className="mt-6">
                    <Link to="/sign-in" className="flex items-center text-blue-500 hover:text-blue-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Sign In
                    </Link>
                </div>
            </div>

            {/* Right Section - Image and Text */}
            <div className="hidden lg:block lg:w-1/2 bg-blue-50">
                <div className="h-full relative flex flex-col items-center justify-center">
                    <div>
                        <img src={ForgetPasswordImage} alt="Medical professionals" className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div className="relative z-10 text-center px-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Password Recovery</h2>
                        <p className="text-lg text-gray-600">
                            Don't worry! It happens. Please enter the email associated with your account.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword

