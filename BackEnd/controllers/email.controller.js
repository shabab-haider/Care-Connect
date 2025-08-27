const doctorModel = require("../models/doctor.model");
const PatientModel = require("../models/Patient.model");
const { sendVerificationEmail } = require("../Utils/sendVerificationEmail");

module.exports.sendCode = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor)
      return res
        .status(400)
        .json({ message: "Email is already registered for a doctor" });
    const existingPatient = await PatientModel.findOne({ email });
    if (existingPatient)
      return res
        .status(400)
        .json({ message: "Email is already registered for a patient" });
    const code = Math.floor(100000 + Math.random() * 900000);
    sendVerificationEmail(email, code);
    res.status(200).json(code);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to send code", error: error.message });
  }
};
