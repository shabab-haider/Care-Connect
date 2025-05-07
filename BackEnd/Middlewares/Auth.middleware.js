const jwt = require("jsonwebtoken");
const PatientModel = require("../models/Patient.model");
const doctorModel = require("../models/doctor.model");

module.exports.PatientAuth = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const Patient = await PatientModel.findOne({ _id: decode.id });
    if (!Patient) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    req.Patient = Patient;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
};

module.exports.doctorAuth = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const doctor = await doctorModel.findOne({ _id: decode.id });
    if (!doctor) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    req.doctor = doctor;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
};
