const doctorModel = require("../models/doctor.model");
const patientModel = require("../models/Patient.model");
const appointmentModel = require("../models/appointment.model");
const tokenModel = require("../models/token.model");
const moment = require("moment");

module.exports.requestAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, selectedDate, selectedToken } = req.body;
    console.log(req.body);

    // Validate input
    if (!doctorId || !patientId || !selectedDate || !selectedToken) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Convert Date to UTC
    const utcDate = moment.tz(selectedDate, "Asia/Karachi").utc().format(); // Convert to UTC

    // Check if doctor exists
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check if patient exists
    const patient = await patientModel.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Find token & ensure it's not already booked
    const tokenDoc = await tokenModel.findOne({
      doctor: doctorId,
      "tokens.date": utcDate, // Use UTC date for searching tokens
    });

    if (!tokenDoc) {
      return res
        .status(404)
        .json({ message: "Token list for this date not found" });
    }

    const dayTokens = tokenDoc.tokens.find((t) => {
      return moment(t.date).isSame(utcDate); // Compare with UTC date
    });

    if (!dayTokens) {
      return res
        .status(404)
        .json({ message: "No tokens for the selected date" });
    }

    const tokenObj = dayTokens.tokenList.id(selectedToken);
    if (!tokenObj) {
      return res.status(404).json({ message: "Token not found" });
    }
    if (tokenObj.isBooked) {
      return res.status(400).json({ message: "Token already booked" });
    }

    // Create appointment with initial status = pending
    const appointment = await appointmentModel.create({
      doctor: doctorId,
      patient: patientId,
      tokenId: selectedToken,
      date: utcDate, // Store date in UTC
      status: "pending", // doctor will confirm later
    });

    // Update token as booked
    tokenObj.isBooked = true;
    tokenObj.patientId = patientId;
    await tokenDoc.save();

    return res.status(201).json({
      message: "Appointment request sent successfully (pending confirmation)",
      appointment,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error booking appointment",
      error: err.message,
    });
  }
};
