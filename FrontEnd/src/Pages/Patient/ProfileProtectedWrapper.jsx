import React, { useContext, useEffect } from "react";
import { PatientDataContext } from "../../Context/PatientContext";
import { useNavigate } from "react-router-dom";

const ProfileProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { patient, setpatient } = useContext(PatientDataContext);
  useEffect(() => {
    if (Object.keys(patient).length === 0) {
      navigate("/sign-up");
    }
  }, [patient]);
  return <>{children}</>;
};

export default ProfileProtectedWrapper;
