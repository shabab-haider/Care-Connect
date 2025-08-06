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

module.exports.UpdatePatient = async ({ id, fullname, email, phoneNumber, profileImage }) => {
  const patient = await PatientModel.findById(id);
  if (!patient) {
    throw new Error("patient not found");
  }
  if (fullname !== undefined) patient.fullname = fullname;
  if (email !== undefined) patient.email = email;
  if (phoneNumber !== undefined) patient.phoneNumber = phoneNumber;
  if (profileImage !== undefined) patient.profileImage = profileImage;
  await patient.save();
  return patient;
};
