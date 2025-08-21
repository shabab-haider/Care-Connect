const PatientModel = require("../models/Patient.model");

module.exports.CreatePatient = async ({
  fullname,
  email,
  password,
  dateOfBirth,
  gender,
  phoneNumber,
  isOffline = false,
}) => {
  // Validation: fullname & phone are always required
  if (!fullname || !phoneNumber || !gender) {
    throw new Error("Fullname, gender and phone number are required");
  }

  // Extra validation for online patients
  if (!isOffline) {
    if (!email || !password || !dateOfBirth) {
      throw new Error(
        "All required fields must be provided for online patients"
      );
    }
  }

  // Create patient record
  const patientData = {
    fullname,
    gender,
    phoneNumber,
    isOffline,
  };

  // Add additional fields only if the patient is online
  if (!isOffline) {
    patientData.email = email;
    patientData.password = password;
    patientData.dateOfBirth = dateOfBirth;
  }

  const patient = await PatientModel.create(patientData);
  return patient;
};


