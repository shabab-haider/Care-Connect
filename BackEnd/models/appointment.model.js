const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  appointmentNo: {
    type: Number,
    required: true,
  },
  // Reference to the _id of object inside tokenList array of tokens collection
  token: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tokens.tokenList", // Reference to the id of object inside tokenList array
    required: true,
  },
  date: {
    type: String, // "YYYY-MM-DD" - store for quick lookups
    required: true,
  },
  status: {
    type: String,
    enum: ["booked", "pending", "completed", "no_show"],
    default: "pending",
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
