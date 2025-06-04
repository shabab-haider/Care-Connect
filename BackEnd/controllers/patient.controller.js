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
    fullName,
    email,
    password,
    dateOfBirth,
    phoneNumber,
    gender,
    profileImage,
  } = req.body;
  const hash = await PatientModel.hashPassword(password);
  const Patient = await PatientServices.CreatePatient({
    fullname: fullName,
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

module.exports.updatePatient = async function (req, res) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() });
  }
  const { id, fullname, email, phoneNumber, profileImage } = req.body;
  try {
    const updatedPatient = await PatientServices.UpdatePatient({
      id,
      fullname,
      email,
      phoneNumber,
      profileImage,
    });
    res
      .status(200)
      .json({
        message: "Patient updated successfully",
        Patient: updatedPatient,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update Patient", details: error.message });
  }
};

module.exports.checkEmail = async function (req, res) {
  try {
    const patient = await PatientModel.findOne({ email: req.body.email });
    if (patient) {
      res.send("Email Exist");
    } else {
      res.send("Email does not exist");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
};
