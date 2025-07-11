import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PatientDataContext } from "../Context/PatientContext";
import DoctorContext, { DoctorDataContext } from "../Context/DoctorContext";

const Logout = () => {
  const { patient, setpatient } = useContext(PatientDataContext);
  const { doctor, setDoctor } = useContext(DoctorDataContext);
  const navigate = useNavigate();

  localStorage.clear();
  setpatient({});
  setDoctor({});
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
      return;
    }
  }, [token]);
  return <div>Loading...</div>;
};

export default Logout;
