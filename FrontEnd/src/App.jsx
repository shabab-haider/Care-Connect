import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import PatientProfileSetup from "./Pages/Patient/ProfileSetup";
import DoctorProfileSetup from "./Pages/Doctor/DoctorProfileSetup";
import PatientDashboard from "./Pages/Patient/PatientDashboard";
import DoctorDashboard from "./Pages/Doctor/DoctorDashboard";




import PatientProfileProtectedWrapper from "./Pages/Patient/ProfileProtectedWrapper";
import DoctorProfileProtectedWrapper from "./Pages/Doctor/ProfileProtectedWrapper";
import PatientProtectedWrapper from "./Pages/Patient/PatientProtectedWrapper";
import DoctorProtectedWrapper from "./Pages/Doctor/DoctorProtectedWrapper";
import Logout from "./Pages/Logout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
       
        
        
        
        
      </Routes>

    </>
  );
};

export default App;
