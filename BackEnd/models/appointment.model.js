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
  tokenId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, // The _id of the token object from Tokens model
  },
  date: {
    type: String, // "YYYY-MM-DD" - store for quick lookups
    required: true,
  },
  status: {
    type: String,
    enum: ["booked", "pending", "completed", "cancelled"],
    default: "pending",
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
