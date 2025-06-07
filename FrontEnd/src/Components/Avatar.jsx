import React, { useContext } from "react";
import defaultProfile from "/Images/DefaultProfile.jpeg";
import { PatientDataContext } from "../Context/PatientContext";
import { DoctorDataContext } from "../Context/DoctorContext";

const Avatar = () => {
  const { patient, setpatient } = useContext(PatientDataContext);
  const { doctor, setDoctor } = useContext(DoctorDataContext);
  return (
    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium overflow-hidden">
      <img
        className="rounded-full object-cover"
        src={doctor.profileImage || patient.profileImage || defaultProfile}
        alt=""
        style={{
          height: "2rem",
          width: "2rem",
          maxHeight: "2rem",
          maxWidth: "2rem",
        }}
      />
    </div>
  );
};

export default Avatar;
