const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
    required: true,
  },
  appointmentDate: {
    type: String, // e.g., "2025-06-08"
    required: true,
  },
  appointmentTime: {
    type: String, // e.g., "11:00 AM"
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "completed", "cancelled"],
    default: "pending",
  },

  notes: {
    type: String, // For doctor to add post-appointment notes (optional)
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
