const { validationResult } = require("express-validator");
const PatientServices = require("../Services/patients.service");
const PatientModel = require("../models/Patient.model");
const bcrypt = require("bcrypt");

module.exports.registerPatient = async function (req, res) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() });
  }

  try {
    let {
      fullname,
      email,
      password,
      dateOfBirth,
      phoneNumber,
      gender,
      profileImage,
      isOffline = false,
    } = req.body;

    // Hash password only for online patients
    if (!isOffline) {
      const hash = await PatientModel.hashPassword(password);
      password = hash;
    } else {
      password = null;
      email = null;
    }

    const patient = await PatientServices.CreatePatient({
      fullname,
      email,
      password,
      dateOfBirth,
      gender,
      phoneNumber,
      profileImage,
      isOffline,
    });

    const token = patient.genrateToken(); // Will be null for offline patients
    if (token) res.cookie("token", token);

    res.status(201).json({
      message: "Patient registered successfully",
      patient,
      token: token || null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering patient",
      error: error.message,
    });
  }
};

module.exports.loginPatient = async function (req, res) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() });
  }

  const { email, password } = req.body;

  try {
    const patient = await PatientModel.findOne({ email }).select("+password");

    if (!patient || patient.isOffline) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const checkPassword = await bcrypt.compare(password, patient.password);
    if (!checkPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = patient.genrateToken();
    res.cookie("token", token);

    res.status(200).json({
      message: "Login successful",
      patient,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
};

module.exports.getPatientDashboard = function (req, res) {
  res.status(200).json({ patient: req.Patient });
};
