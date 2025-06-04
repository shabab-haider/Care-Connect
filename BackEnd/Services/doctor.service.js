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

module.exports.UpdateDoctor = async ({
  id,
  fullname,
  email,
  profileImage,
  basicInfo: { phoneNumber },
  clinicInfo: { clinicAddress, clinicName, consultationHours },
  professionalDetails: {
    checkupfee,
    licenseNumber,
    specialty,
   },
}) => {
  const doctor = await doctorModel.findById(id);
  if (!doctor) {
    throw new Error("Doctor not found");
  }

  doctor.fullname = fullname || doctor.fullname;
  doctor.email = email || doctor.email;
  doctor.profileImage = profileImage || doctor.profileImage;
  doctor.basicInfo.phoneNumber = phoneNumber || doctor.basicInfo.phoneNumber;
  doctor.clinicInfo.clinicAddress =
    clinicAddress || doctor.clinicInfo.clinicAddress;
  doctor.clinicInfo.clinicName = clinicName || doctor.clinicInfo.clinicName;
  doctor.clinicInfo.consultationHours =
    consultationHours || doctor.clinicInfo.consultationHours;
  doctor.professionalDetails.checkupfee =
    checkupfee || doctor.professionalDetails.checkupfee;
  doctor.professionalDetails.licenseNumber =
    licenseNumber || doctor.professionalDetails.licenseNumber;
  doctor.professionalDetails.specialty =
    specialty || doctor.professionalDetails.specialty;

  await doctor.save();
  return doctor;
};


