import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import PatientDashboard from "./Pages/Patient/PatientDashboard";
import DoctorDashboard from "./Pages/Doctor/DoctorDashboard";

import PatientProtectedWrapper from "./Pages/Patient/PatientProtectedWrapper";
import DoctorProtectedWrapper from "./Pages/Doctor/DoctorProtectedWrapper";
import Logout from "./Pages/Logout";
import Login from "./Pages/Login";
import PatientSignup from "./Pages/Patient/PatientSignup";
import DoctorSignup from "./Pages/Doctor/DoctorSignup";
import FindDoctor from "./Pages/Patient/FindDoctor";
import AppointmentBooking from "./Pages/Patient/AppointmentBooking";
import DoctorPendingRequests from "./Pages/Doctor/DoctorPendingRequests";
import ConsultationForm from "./Pages/Doctor/ConsultationForm";
import PatientAppointments from "./Pages/Patient/patientAppointments";
import DoctorAppointments from "./Pages/Doctor/DoctorAppointments";
import DoctorProfile from "./Pages/Doctor/DoctorProfile";
import DoctorFutureSchedule from "./Pages/Doctor/DoctorFutureSchedule";
import PatientMedicalRecords from "./Pages/Patient/PatientMedicalRecords";
import PatientProfile from "./Pages/Patient/PatientProfile";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient-signup" element={<PatientSignup />} />
        <Route path="/doctor-signup" element={<DoctorSignup />} />
        {/* Patient Routes */}
        <Route
          path="/patient-dashboard"
          element={
            <PatientProtectedWrapper>
              <PatientDashboard />
            </PatientProtectedWrapper>
          }
        />

        <Route path="/find-doctor" element={<FindDoctor />} />
        <Route
          path="/medical-record/:patientId"
          element={<PatientMedicalRecords />}
        />
        <Route
          path="/patient-appointment-history"
          element={<PatientAppointments />}
        />
        <Route
          path="/appointment-booking/:id"
          element={<AppointmentBooking />}
        />
        <Route path="/patient-profile" element={<PatientProfile />} />

        {/* Doctor Routes */}
        <Route
          path="/doctor-dashboard"
          element={
            <DoctorProtectedWrapper>
              <DoctorDashboard />
            </DoctorProtectedWrapper>
          }
        />
        <Route
          path="/appointment-requests"
          element={<DoctorPendingRequests />}
        />
        <Route
          path="/doctor-appointment-history"
          element={<DoctorAppointments />}
        />
        <Route
          path="/consultation/:doctorId/:patientId/:appointmentId"
          element={<ConsultationForm />}
        />
        <Route path="/doctor-profile" element={<DoctorProfile />} />
        <Route path="/Schedule" element={<DoctorFutureSchedule />} />
      </Routes>
    </>
  );
};

export default App;
