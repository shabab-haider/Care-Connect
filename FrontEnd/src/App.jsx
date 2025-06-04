import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import SignIn from "./Pages/Sign-In";
import SignUp from "./Pages/Sign-Up";
import ForgotPassword from "./Pages/Forget-Password";
import PatientProfileSetup from "./Pages/Patient/ProfileSetup";
import DoctorProfileSetup from "./Pages/Doctor/DoctorProfileSetup";
import PatientDashboard from "./Pages/Patient/Dashboard";
import DoctorDashboard from "./Pages/Doctor/Dashboard";
import PatientsList from "./Pages/Doctor/PatientList";
import PatientDetails from "./Pages/Doctor/PatientDetails";
import AddPatient from "./Pages/Doctor/AddPatient";
import DoctorProfile from "./Pages/Doctor/ProfileSetting";
import PatientProfile from "./Pages/Patient/ProfileSetting";
import AppointmentBooking from "./Pages/Patient/AppointmentBooking";
import DoctorSearch from "./Pages/Patient/DoctorSearch";
import PatientNotifications from "./Pages/Patient/Notifications";
import AIChatbot from "./Pages/Patient/AiChatbot";
import DoctorNotifications from "./Pages/Doctor/Notifications";
import PatientProfileProtectedWrapper from "./Pages/Patient/ProfileProtectedWrapper";
import DoctorProfileProtectedWrapper from "./Pages/Doctor/ProfileProtectedWrapper";
import PatientProtectedWrapper from "./Pages/Patient/PatientProtectedWrapper";
import DoctorProtectedWrapper from "./Pages/Doctor/DoctorProtectedWrapper";
import Logout from "./Pages/Logout";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
        {/* <Route path="forgot-password" element={<ForgotPassword />} /> */}
        <Route path="sign-up" element={<SignUp />} />
        <Route path="logout" element={<Logout />} />
        {/* Patient Routes */}
        <Route
          path="Patient-Profile-Setup"
          element={
            <PatientProfileProtectedWrapper>
              <PatientProfileSetup />
            </PatientProfileProtectedWrapper>
          }
        />
        <Route
          path="patient-dashboard"
          element={
            <PatientProtectedWrapper>
              <PatientDashboard />
            </PatientProtectedWrapper>
          }
        />
        <Route
          path="ai-chatbot"
          element={
            <PatientProtectedWrapper>
              <AIChatbot />
            </PatientProtectedWrapper>
          }
        />
        <Route
          path="book-appointment"
          element={
            <PatientProtectedWrapper>
              <AppointmentBooking />
            </PatientProtectedWrapper>
          }
        />
        <Route
          path="find-doctors"
          element={
            <PatientProtectedWrapper>
              <DoctorSearch />
            </PatientProtectedWrapper>
          }
        />
        <Route
          path="patient-profile"
          element={
            <PatientProtectedWrapper>
              <PatientProfile />
            </PatientProtectedWrapper>
          }
        />
        <Route
          path="patient-notifications"
          element={
            <PatientProtectedWrapper>
              <PatientNotifications />
            </PatientProtectedWrapper>
          }
        />
        {/* Doctor Routes */}
        <Route
          path="doctor-dashboard"
          element={
            <DoctorProtectedWrapper>
              <DoctorDashboard />
            </DoctorProtectedWrapper>
          }
        />
        <Route
          path="doctor-Profile-Setup"
          element={
            <DoctorProfileProtectedWrapper>
              <DoctorProfileSetup />
            </DoctorProfileProtectedWrapper>
          }
        />
        <Route
          path="doctor-profile"
          element={
            <DoctorProtectedWrapper>
              <DoctorProfile />
            </DoctorProtectedWrapper>
          }
        />
        <Route
          path="patient-list"
          element={
            <DoctorProtectedWrapper>
              <PatientsList />
            </DoctorProtectedWrapper>
          }
        />
        <Route
          path="add-patient"
          element={
            <DoctorProtectedWrapper>
              <AddPatient />
            </DoctorProtectedWrapper>
          }
        />
        <Route
          path="patient-details"
          element={
            <DoctorProtectedWrapper>
              <PatientDetails />
            </DoctorProtectedWrapper>
          }
        />
        <Route
          path="doctor-notifications"
          element={
            <DoctorProtectedWrapper>
              <DoctorNotifications />
            </DoctorProtectedWrapper>
          }
        />
      </Routes>

      {/* <Home /> */}
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      {/* <ForgotPassword /> */}
      {/* <PatientProfileSetup /> */}
      {/* <DoctorProfileSetup /> */}
      {/* <PatientDashboard /> */}
      {/* <DoctorDashboard /> */}
      {/* <PatientsList /> */}
      {/* <PatientDetails /> */}
      {/* <AddPatient />   */}
      {/* <DoctorProfile /> */}
      {/* <PatientDashboard />   */}
      {/* <AppointmentBooking /> */}
      {/* <DoctorSearch /> */}
      {/* <PatientProfile /> */}
      {/* <PatientNotifications /> */}
      {/* <DoctorNotifications /> */}
      {/* <AIChatbot /> */}
    </>
  );
};

export default App;
