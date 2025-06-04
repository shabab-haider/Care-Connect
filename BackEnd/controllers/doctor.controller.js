const { validationResult } = require("express-validator");
const doctorService = require("../Services/doctor.service");
const doctorModel = require("../models/doctor.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerDoctor = async function (req, res) {
  const err = validationResult(req);
  if (!err.isEmpty) {
    return res.status(400).json({ errors: err.array() });
  }
  let {
    fullname,
    email,
    password,
    basicInfo,
    clinicInfo,
    professionalDetails,
  } = req.body;
  const hash = await doctorModel.hashPassword(password);
  const doctor = await doctorService.Createdoctor({
    fullname,
    email,
    password: hash,
    basicInfo,
    clinicInfo,
    professionalDetails,
  });
  const token = doctor.genrateToken();
  res.cookie("token", token);

  res.json({ doctor: doctor, token: token });
};

module.exports.loginDoctor = async function (req, res) {
  const err = validationResult(req);
  if (!err.isEmpty) {
    return res.status(422).json({ errors: err.array() });
  }
  let { email, password } = req.body;
  const doctor = await doctorModel.findOne({ email }).select("+password");
  if (!doctor) {
    return res.status(401).json({ Error: "Invalid Credentials" });
  }
  const checkPassword = await bcrypt.compare(password, doctor.password);
  if (!checkPassword) {
    return res.status(401).json({ Error: "Invalid Credentials" });
  }
  const token = doctor.genrateToken();
  res.cookie("token", token);
  res.json({ doctor: doctor, token: token });
};

module.exports.getDoctorDashboard = function (req, res) {
  res.status(200).json({ doctor: req.doctor });
};

module.exports.checkEmail = async function (req, res) {
  try {
    const doctor = await doctorModel.findOne({ email: req.body.email });
    if (doctor) {
      res.send("Email Exist");
    } else {
      res.send("Email does not exist");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports.updateDoctor = async function (req, res) {
  console.log(req.body);
  let {
    id,
    fullname,
    email,
    profileImage,
    basicInfo: { phoneNumber },
    clinicInfo: { clinicAddress, clinicName, consultationHours },
    professionalDetails: { checkupfee, licenseNumber, specialty },
  } = req.body;
  try {
    const updatedDoctor = await doctorService.UpdateDoctor({
      id,
      fullname,
      email,
      profileImage,
      basicInfo: { phoneNumber },
      clinicInfo: { clinicAddress, clinicName, consultationHours },
      professionalDetails: { checkupfee, licenseNumber, specialty },
    });
    res.status(200).json({
      message: "Doctor updated successfully",
      doctor: updatedDoctor,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update Doctor", details: error.message });
  }
};

module.exports.getDoctors = async function (req, res) {
  try {
    const doctors = await doctorModel.find();
    res.status(200).json({ doctors: doctors });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to find Doctors", details: error.message });
  }
};
