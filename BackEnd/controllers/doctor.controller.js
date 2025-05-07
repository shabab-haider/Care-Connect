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
    fullName,
    email,
    password,
    basicInfo,
    clinicInfo,
    professionalDetails,
  } = req.body;
  const hash = await doctorModel.hashPassword(password);
  const doctor = await doctorService.Createdoctor({
    fullname: fullName,
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
  const doctor = await doctorModel.findOne({ email });
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
