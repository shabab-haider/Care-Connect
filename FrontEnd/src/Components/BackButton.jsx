import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    const lastRoute = localStorage.getItem("lastVisitedRoute");
    const current = window.location.pathname;
    if (current == "/login") {
      navigate("/");
    }
    if (current == "/patient-signup") {
      navigate("/");
    }
    if (current == "/doctor-signup") {
      navigate("/");
    }
    if (/^\/appointment-booking\/[a-f0-9]{24}$/.test(current)) {
      navigate("/find-doctor");
    }
    if (/^\/medical-record\/[a-f0-9]{24}$/.test(current)) {
      navigate("/patient-dashboard");
    }
    if (current == "/find-doctor") {
      navigate("/patient-dashboard");
    }
    if (current == "/patient-appointment-history") {
      navigate("/patient-dashboard");
    }
    if (current == "/patient-profile") {
      navigate("/patient-dashboard");
    }
    if (current == "/appointment-requests") {
      navigate("/doctor-dashboard");
    }
    if (current == "/Schedule") {
      navigate("/doctor-dashboard");
    }
    if (current == "/doctor-profile") {
      navigate("/doctor-dashboard");
    }
    if (current == "/doctor-appointment-history") {
      navigate("/doctor-dashboard");
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      <span className="font-medium">Back</span>
    </button>
  );
};

export default BackButton;
