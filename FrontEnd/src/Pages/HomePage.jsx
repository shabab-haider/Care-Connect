import {
  Clock,
  Calendar,
  Users,
  MessageCircle,
  Shield,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Star,
  Heart,
  Activity,
  UserCheck,
  PlayCircle,
  Zap,
  TrendingUp,
} from "lucide-react"
import FloatingChatbot from "../Components/FloatingChatbot"
import Logo from "../Components/Logo"
import { Link } from "react-router-dom"


const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="bg-white shadow-lg border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Logo />
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                How It Works
              </a>
              <a href="#for-doctors" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                For Doctors
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/login" className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors">
                Login
              </Link>
              <Link to="/patient-signup" className="p-3 bg-blue-600 hover:bg-blue-700 text-white md:px-6 md:py-2 rounded-lg font-medium transition-colors shadow-md">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Activity className="h-4 w-4 mr-2" />
                Smart Healthcare Management
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Skip the Queue,
                <span className="text-blue-600 block">Save Your Time</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Revolutionary appointment booking system that eliminates long waiting times. Get your token, track your
                position, and arrive just in time for your appointment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/patient-signup" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center transition-all shadow-lg hover:shadow-xl">
                  Get Started as Patient
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/doctor-signup" className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all text-center">
                  Join as Doctor
                </Link>
              </div>
              
            </div>

            {/* Platform Benefits Showcase */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border">
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Why Care Connect?</h3>
                  <p className="text-gray-600 text-sm mt-2">See the difference we make</p>
                </div>

                {/* Benefits Comparison */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 font-medium">Traditional Way</span>
                    </div>
                    <span className="text-red-600 font-bold">3-4 Hours Wait</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700 font-medium">With Care Connect</span>
                    </div>
                    <span className="text-green-600 font-bold">15 Minutes</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-700">95% Time Saved</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <Star className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-700">4.9/5 Rating</div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border">
                    <div className="flex items-center justify-center mb-2">
                      <PlayCircle className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Ready to experience the difference?</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all">
                      Start Your Journey
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Healthcare Problem We Solve</h2>
            <p className="text-lg text-gray-600">Transforming the way patients and doctors connect</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
              <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center">
                <Clock className="h-6 w-6 mr-2" />
                Current Problems
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Patients waste 2-4 hours waiting in hospital queues</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>No visibility into actual waiting times</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Difficulty finding the right specialist</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Lost medical records and appointment history</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Inefficient doctor-patient communication</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
              <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                Our Solution
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Smart token system with real-time queue tracking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>AI-powered doctor recommendations based on symptoms</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Comprehensive doctor search with filters</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Digital medical history management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Automated notifications and reminders</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    

      {/* Key Features Section */}
      <section id="features" className="py-20 bg-white min-h-screen min-w-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Care Connect?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of healthcare with our intelligent appointment management system
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center group border">
              <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Calendar className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Booking</h3>
              <p className="text-gray-600 leading-relaxed">
                Find doctors, check real-time availability, and book appointments instantly with our intelligent system
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center group border">
              <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <Clock className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Token System</h3>
              <p className="text-gray-600 leading-relaxed">
                Get your unique token number and track your queue position with accurate waiting time estimates
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center group border">
              <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <MessageCircle className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Assistant</h3>
              <p className="text-gray-600 leading-relaxed">
                Describe your symptoms to our AI chatbot and get personalized doctor recommendations instantly
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center group border">
              <div className="bg-orange-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors">
                <Shield className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Medical Records</h3>
              <p className="text-gray-600 leading-relaxed">
                Secure digital storage of your complete medical history accessible anytime, anywhere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50 min-h-screen min-w-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to revolutionize your healthcare experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center relative">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Search & Select</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse through verified doctors, filter by location, specialization, and fees. View detailed profiles
                and patient reviews to make informed decisions.
              </p>
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent"></div>
            </div>

            <div className="text-center relative">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Book & Get Token</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose your preferred date and time slot, then get instantly assigned a token number. Track your
                position in the real-time queue from anywhere.
              </p>
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-green-200 to-transparent"></div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Visit Doctor</h3>
              <p className="text-gray-600 leading-relaxed">
                Arrive just in time for your appointment based on real-time updates. No more long waits! Your medical
                records are digitally maintained for future reference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Doctors Section */}
      <section id="for-doctors" className="py-20 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen min-w-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">For Healthcare Providers</h2>
              <p className="text-xl text-gray-600 mb-8">
                Transform your practice with our comprehensive patient management platform
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Smart Patient Management</h4>
                    <p className="text-gray-600">
                      Efficiently manage appointments, add offline patients, and maintain organized queues with our
                      intelligent token system.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Flexible Scheduling</h4>
                    <p className="text-gray-600">
                      Set your availability, appointment limits, and consultation fees. Accept or decline appointment
                      requests based on your schedule.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Digital Medical Records</h4>
                    <p className="text-gray-600">
                      Maintain comprehensive patient histories with symptoms, medications, and treatment plans all in
                      one secure platform.
                    </p>
                  </div>
                </div>
              </div>
              <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl">
                Join as Doctor
              </button>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-2xl border">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Doctor Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Reduce patient waiting complaints by 95%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Streamlined appointment management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Digital patient record management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Automated email notifications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Increased patient satisfaction</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Better practice efficiency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Healthcare?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Join thousands of patients and doctors who are already experiencing the future of healthcare management
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white hover:bg-gray-100 text-blue-600 px-10 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl">
              Start as Patient
            </button>
            <button className="bg-transparent hover:bg-white hover:text-blue-600 text-white border-2 border-white px-10 py-4 rounded-xl text-lg font-semibold transition-all">
              Register as Doctor
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center mb-4">
                <Logo />
              </div>
              <p className="text-gray-400 leading-relaxed">
                Revolutionizing healthcare with smart appointment management and digital patient care.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">For Patients</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Find Doctors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Book Appointment
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    AI Health Assistant
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Patient Registration
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">For Doctors</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Doctor Registration
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Manage Practice
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Patient Management
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Analytics Dashboard
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3" />
                  <span>support@careconnect.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>123 Healthcare St, Medical City</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Care Connect. All rights reserved. Built with MERN Stack.</p>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot */}
      <FloatingChatbot />
    </div>
  )
}

export default HomePage
