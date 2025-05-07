const doctorModel = require("../models/doctor.model");

module.exports.Createdoctor = async ({
  fullname,
  email,
  password,
  basicInfo,
  clinicInfo,
  professionalDetails,
}) => {
  if (
    (!fullname || !email || !password, !basicInfo) ||
    !clinicInfo ||
    !professionalDetails
  ) {
    throw new Error("All Fields Are Required");
  }
  const doctor = await doctorModel.create({
    fullname,
    email,
    password,
    basicInfo,
    clinicInfo,
    professionalDetails,
  });
  return doctor;
};
