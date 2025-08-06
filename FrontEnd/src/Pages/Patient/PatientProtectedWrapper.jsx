import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PatientDataContext } from "../../Context/PatientContext";

const PatientProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const { patient, setpatient } = useContext(PatientDataContext);
  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
    } else {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/patients/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => {
          navigate("/sign-in");
        });
    }
  }, [token]);
  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return <>{children}</>;
  }
};

export default PatientProtectedWrapper;
