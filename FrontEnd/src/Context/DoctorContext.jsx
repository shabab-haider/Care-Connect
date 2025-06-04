import React, { Children, createContext, useEffect, useState } from "react";
export const DoctorDataContext = createContext();

const DoctorContext = ({ children }) => {
    const [doctor, setDoctor] = useState(() => {
        const storeddoctor = localStorage.getItem("doctor");
        return storeddoctor ? JSON.parse(storeddoctor) : null;
      });
      useEffect(() => {
        if (doctor) {
          localStorage.setItem("doctor", JSON.stringify(doctor));
        }
      }, [doctor]);
  return (
    <>
      <DoctorDataContext.Provider value={{ doctor, setDoctor }}>
        {children}
      </DoctorDataContext.Provider>
    </>
  );
};

export default DoctorContext;
