const { validationResult } = require("express-validator");
const PatientServices = require("../Services/patients.service");
const PatientModel = require("../models/Patient.model");
const bcrypt = require("bcrypt");

module.exports.registerPatient = async function (req, res) {
  const err = validationResult(req);
  if (!err.isEmpty) {
    return res.status(400).json({ errors: err.array() });
  }
  let {
    fullname,
    email,
    password,
    dateOfBirth,
    phoneNumber,
    gender,
    profileImage,
  } = req.body;
  const hash = await PatientModel.hashPassword(password);
  const Patient = await PatientServices.CreatePatient({
    fullname,
    email,
    password: hash,
    dateOfBirth,
    gender,
    phoneNumber,
    profileImage,
  });
  const token = Patient.genrateToken();
  res.cookie("token", token);
  res.json({ patient: Patient, token: token });
};

module.exports.loginPatient = async function (req, res) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() });
  }
  let { email, password } = req.body;
  const Patient = await PatientModel.findOne({ email }).select("+password");
  if (!Patient) {
    return res.status(401).json({ error: "Invalid Credentials" });
  }
  const checkPassword = await bcrypt.compare(password, Patient.password);
  if (!checkPassword) {
    return res.status(401).json({ error: "Invalid Credentials" });
  }
  const token = Patient.genrateToken();
  res.cookie("token", token);
  res.json({ patient: Patient, token: token });
};

module.exports.getPatientDashboard = function (req, res) {
  res.status(200).json({ Patient: req.Patient });
};




