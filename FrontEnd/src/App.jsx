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
import ProfileProtectedWrapper from "./Pages/ProfileProtectedWrapper";
import PatientProtectedWrapper from "./Pages/Patient/PatientProtectedWrapper";
import DoctorProtectedWrapper from "./Pages/Doctor/DoctorProtectedWrapper";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
        {/* <Route path="forgot-password" element={<ForgotPassword />} /> */}
        <Route path="sign-up" element={<SignUp />} />
        {/* Patient Routes */}
        <Route
          path="Patient-Profile-Setup"
          element={
            <ProfileProtectedWrapper>
              <PatientProfileSetup />
            </ProfileProtectedWrapper>
          }
        />
        <Route
          path="Patient-dashboard"
          element={
            <PatientProtectedWrapper>
              <PatientDashboard />
            </PatientProtectedWrapper>
          }
        />
        <Route path="ai-chatbot" element={<AIChatbot />} />
        <Route path="book-appointment" element={<AppointmentBooking />} />
        <Route path="find-doctors" element={<DoctorSearch />} />
        <Route path="settings" element={<PatientProfile />} />
        <Route path="PatientNotifications" element={<PatientNotifications />} />
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
            <ProfileProtectedWrapper>
              <DoctorProfileSetup />
            </ProfileProtectedWrapper>
          }
        />
        <Route path="doctorProfile" element={<DoctorProfile />} />
        <Route path="patient-list" element={<PatientsList />} />
        <Route path="add-patient" element={<AddPatient />} />
        <Route path="patient-details" element={<PatientDetails />} />
        <Route path="doctorNotifications" element={<DoctorNotifications />} />
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
