const mongoose = require("mongoose");
const medicalRecordSchema = mongoose.Schema({
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
  date: {
    type: String, // "YYYY-MM-DD" - store for quick lookups
    required: true,
  },
  appointmentDetails: {
    type: String,
    required: true,
  },
  prescription: {
    validity: {
      type: String, //Date
      required: true,
    },
    medicines: [
      {
        name: {
          type: String,
          required: true,
        },
        instructions: {
          type: String,
        },
        frequency: {
          type: [String],
          required: true,
        },
        dosage: {
          type: String,
          required: true,
        },
      },
    ],
  },
});

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);
