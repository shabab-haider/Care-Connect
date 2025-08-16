const PatientModel = require("../models/Patient.model");

module.exports.CreatePatient = async ({
  fullname,
  email,
  password,
  dateOfBirth,
  gender,
  phoneNumber,
  profileImage,
  isOffline = false,
}) => {
  // Validation: fullname & phone are always required
  if (!fullname || !phoneNumber) {
    throw new Error("Fullname and phone number are required");
  }

  // Extra validation for online patients
  if (!isOffline) {
    if (!email || !password || !dateOfBirth || !gender) {
      throw new Error(
        "All required fields must be provided for online patients"
      );
    }
  }

  // Create patient record
  const patient = await PatientModel.create({
    fullname,
    email: isOffline ? null : email,
    password: isOffline ? null : password,
    dateOfBirth: isOffline ? null : dateOfBirth,
    gender: isOffline ? null : gender,
    phoneNumber,
    profileImage,
    isOffline,
  });

  return patient;
};
