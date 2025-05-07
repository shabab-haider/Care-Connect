const PatientModel = require("../models/Patient.model");

module.exports.CreatePatient = async ({
  fullname,
  email,
  password,
  dateOfBirth,
  gender,
  phoneNumber,
  profileImage,
}) => {
  if (!fullname || !email || !password) {
    throw new Error("All Fields Are Required");
  }
  const Patient = await PatientModel.create({
    fullname,
    email,
    password,
    dateOfBirth,
    gender,
    phoneNumber,
    profileImage,
  });
  return Patient;
};
