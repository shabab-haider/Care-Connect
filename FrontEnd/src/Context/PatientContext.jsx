import React, { createContext, useEffect, useState } from "react";
export const PatientDataContext = createContext();

const PatientContext = ({ children }) => {
  const [patient, setpatient] = useState(() => {
    const storedpatient = localStorage.getItem("patient");
    return storedpatient ? JSON.parse(storedpatient) : null;
  });
  useEffect(() => {
    if (patient) {
      localStorage.setItem("patient", JSON.stringify(patient));
    }
  }, [patient]);
  return (
    <>
      <PatientDataContext.Provider value={{ patient, setpatient }}>
        {children}
      </PatientDataContext.Provider>
    </>
  );
};

export default PatientContext;
