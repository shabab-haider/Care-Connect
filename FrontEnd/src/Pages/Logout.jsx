import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PatientDataContext } from "../Context/PatientContext";
import DoctorContext, { DoctorDataContext } from "../Context/DoctorContext";
import { toast } from "react-toastify";

const Logout = () => {
  const { patient, setPatient } = useContext(PatientDataContext);
  const { doctor, setDoctor } = useContext(DoctorDataContext);
  const navigate = useNavigate();

  localStorage.clear();
  setPatient({});
  setDoctor({});
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      toast.success("Looged out");
      navigate("/login");
      return;
    }
  }, [token]);
  return <div>Loading...</div>;
};

export default Logout;
