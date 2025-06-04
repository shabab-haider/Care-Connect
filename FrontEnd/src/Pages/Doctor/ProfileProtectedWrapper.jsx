import React, { useContext, useEffect } from "react";
import { DoctorDataContext } from "../../Context/DoctorContext";
import { useNavigate } from "react-router-dom";

const ProfileProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { doctor, setDoctor } = useContext(DoctorDataContext);
  useEffect(() => {
    if (Object.keys(doctor).length === 0) {
      navigate("/sign-up");
    }
  }, [doctor]);
  return <>{children}</>;
};

export default ProfileProtectedWrapper;
