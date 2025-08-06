const { validationResult } = require("express-validator");
const doctorService = require("../Services/doctor.service");
const doctorModel = require("../models/doctor.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerDoctor = async function (req, res) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() });
  }

  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phone,
      specialization,
      experience,
      qualification,
      registrationNumber,
      consultationFee,
      avgAppointmentTime,
      clinicName,
      address,
      city,
      state,
      pincode,
      availableDays,
      clinicOpenTime,
      clinicCloseTime,
      appointmentsPerDay,
    } = req.body;

    // Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check for existing doctor
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res
        .status(409)
        .json({ message: "Doctor with this email already exists" });
    }

    // Hash password
    const hashedPassword = await doctorModel.hashPassword(password);

    // Create doctor
    const doctor = await doctorModel.create({
      fullName: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      phone,
      professionalDetails: {
        specialization,
        experience,
        qualification,
        registrationNumber,
        consultationFee,
        avgAppointmentTime,
      },
      clinicInfo: {
        clinicName,
        address,
        city,
        state,
        pincode,
        availableDays,
        clinicOpenTime,
        clinicCloseTime,
        appointmentsPerDay,
      },
    });

    // Token
    const token = doctor.genrateToken();
    res.cookie("token", token);

    // Success Response
    res.status(201).json({
      message: "Doctor registered successfully",
      doctor: {
        _id: doctor._id,
        fullName: doctor.fullName,
        email: doctor.email,
        profileImage: doctor.profileImage,
      },
      token,
    });
  } catch (error) {
    console.error("Doctor registration error:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
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
